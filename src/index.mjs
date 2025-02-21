import express from "express";
import {
  Connection,
  Receiver,
  SimulatorDataArea,
  SimulatorDataPeriod,
  SimulatorDataType,
  ClientDataType,
  ClientDataOffsetAuto,
  ClientDataArea,
} from "@flybywiresim/msfs-nodejs";
import cors from "cors";
import "./systray.mjs";

const RequestIds = {
  traffic: 1,
  groundspeed: 2,
};

const fields = [
  {
    name: "ATC ID",
    memberName: "atcId",
    type: SimulatorDataType.String32,
    unit: null,
  },
  {
    name: "TITLE",
    memberName: "title",
    type: SimulatorDataType.String256,
    unit: null,
  },
  {
    name: "ATC AIRLINE",
    memberName: "airline",
    type: SimulatorDataType.String64,
    unit: null,
  },
  {
    name: "ATC MODEL",
    memberName: "type",
    type: SimulatorDataType.String32,
    unit: null,
  },
  {
    name: "PLANE LATITUDE",
    memberName: "latitude",
    type: SimulatorDataType.Float64,
    unit: "degrees",
  },
  {
    name: "PLANE LONGITUDE",
    memberName: "longitude",
    type: SimulatorDataType.Float64,
    unit: "degrees",
  },
  {
    name: "PLANE ALTITUDE",
    memberName: "altitude",
    type: SimulatorDataType.Float64,
    unit: "feet",
  },
  {
    name: "ATC HEAVY",
    memberName: "isHeavy",
    type: SimulatorDataType.Int32,
    unit: "bool",
  },
  {
    name: "GROUND VELOCITY",
    memberName: "groundSpeed",
    type: SimulatorDataType.Int32,
    unit: "knots",
  },
  {
    name: "TRANSPONDER CODE",
    memberName: "transponder",
    type: SimulatorDataType.Int32,
    unit: "number",
  },
];

const app_state = {
  server: express(),
  simConnect: null,
};
app_state.server.use(cors());

const createDataArea = (port) => {
  if (!app_state.clientArea) {
    const area = new ClientDataArea(app_state.simConnect, 0);
    if (!area.mapNameToId("HDW_TRAFFIC_PORT")) {
      console.log("Unable to map the ID");
      return;
    }
    const addedDefinition = area.addDataDefinition({
      definitionId: 0,
      offset: ClientDataOffsetAuto,
      sizeOrType: ClientDataType.Int16,
      epsilon: 0.0,
      memberName: "port",
    });
    if (!addedDefinition) {
      console.log("Unable to add the definitions");
      return;
    }
    app_state.clientArea = area;
  }
  const area = app_state.clientArea;
  area.allocateArea(2, true);
  app_state.setTick = setInterval(() => area.setData({ port }), 5000);
};

const getVatsimData = async () => {
  const req = await fetch("https://data.vatsim.net/v3/vatsim-data.json");
  const data = await req.json();
  if (data) {
    app_state.vatsim = { pilots: data.pilots, last: Date.now(), map: {} };
  }
};

const getVatsimEntry = async (callsign) => {
  if (!callsign || !callsign.length || !app_state.vatsim) return null;
  const cached = app_state.vatsim.map[callsign];
  if (cached) return cached;
  const e = app_state.vatsim.pilots.find(
    (e) => e.callsign.toLowerCase() === callsign.toLowerCase(),
  );
  if (e) {
    app_state.vatsim.map[callsign] = e;
  }
  return e;
};

const pending = {};
const pendingSpeed = {};
const failed = {};

const connect = () => {
  app_state.simConnect = new Connection();
  if (app_state.simConnect.open("TrafficFetcher")) {
    app_state.dataDef = new SimulatorDataArea(
      app_state.simConnect,
      RequestIds.traffic,
    );
    for (const field of fields) {
      const added = app_state.dataDef.addDataDefinition(field);
      if (!added) {
        throw new Error("could not add: " + field.name);
      }
    }
    app_state.dataDefSpeed = new SimulatorDataArea(
      app_state.simConnect,
      RequestIds.groundspeed,
    );
    app_state.dataDefSpeed.addDataDefinition({
      name: "GROUND VELOCITY",
      memberName: "groundSpeed",
      type: SimulatorDataType.Int32,
      unit: "knots",
    });
    const receiver = new Receiver(app_state.simConnect);
    receiver.addCallback("open", (message) => {
      console.log("Simlink connected to MSFS");
      getVatsimData();
      app_state.vatsim_task = setInterval(() => getVatsimData(), 1000 * 45);
      app_state.online = true;
      createDataArea(app_state.port);
    });
    receiver.addCallback("quit", () => {
      app_state.online = false;
      app_state.simConnect = null;
      app_state.clientArea = null;
      if (app_state.vatsim_task) {
        clearInterval(app_state.vatsim_task);
        app_state.vatsim_task = null;
      }
      if (app_state.setTick) {
        clearInterval(app_state.setTick);
        app_state.setTick = null;
      }
      console.log("Simlink disconnected to MSFS");
      if (process.pkg) process.exit(0);
      else setTimeout(() => connect(), 1000);
    });
    receiver.addCallback("simulatorData", async (message) => {
      if (
        message.definitionId == RequestIds.traffic &&
        pending[message.objectId]
      ) {
        const { tm, clients } = pending[message.objectId];
        clearTimeout(tm);
        if (message.content && message.content.atcId)
          message.content.vatsim = await getVatsimEntry(message.content.atcId);
        for (const c of clients) c.json(message.content);
        delete pending[message.objectId];
      } else if (
        message.definitionId == RequestIds.groundspeed &&
        pendingSpeed[message.objectId]
      ) {
        const { tm, clients } = pendingSpeed[message.objectId];
        clearTimeout(tm);
        for (const c of clients) c.json(message.content);
        delete pendingSpeed[message.objectId];
      }
    });
    receiver.addCallback("exception", (message) => {
      console.log(
        `Exception: ${message.exception} ${message.sendId} ${message.index}`,
      );
      console.log(message.exceptionText);
    });
    receiver.addCallback("error", (message) => {
      if (message !== null) {
        console.log(`Error: ${message.id}`);
      } else {
        console.log("Invalid error");
      }
    });
    app_state.receiver = receiver;
    receiver.start();
  } else {
    console.log("Failed to connect to sim");
    setTimeout(() => connect(), 1000);
  }
};

const resetConnection = () => {
  try {
    app_state.simConnect.close();
  } catch {}
  app_state.online = false;
  app_state.simConnect = null;
  app_state.clientArea = null;
  if (app_state.vatsim_task) {
    clearInterval(app_state.vatsim_task);
    app_state.vatsim_task = null;
  }
  if (app_state.setTick) {
    clearInterval(app_state.setTick);
    app_state.setTick = null;
  }
  console.log("Simlink disconnected from MSFS");
  setTimeout(() => connect(), 1000);
};

app_state.server.get("/data/:id", (req, res) => {
  if (!app_state.online) {
    res.status(404).end();
    return;
  }
  if (!app_state.simConnect.isConnected()) {
    resetConnection();
    res.status(404).json({});
    return;
  }
  const id = Number.parseInt(req.params.id);
  console.log("Received request for object:", id);
  if (failed[id]) {
    if (failed[id] < 10) {
      failed[id] += 1;
      res.status(404).json({ message: "Unknown SimObject" });
      return;
    }
    delete failed[id];
  }
  if (!pending[id]) {
    app_state.receiver.requestSimulatorDataForId(
      app_state.dataDef,
      SimulatorDataPeriod.Once,
      id,
    );
    pending[id] = {
      clients: [],
      tm: setTimeout(() => {
        console.log("Request timed out", id);
        failed[id] = 0;
        for (const client of pending[id].clients) {
          try {
            client.status(408).json({ message: "msfs did not answer" });
          } catch {}
        }
        delete pending[id];
      }, 1000),
    };
  } else {
    console.warn("batch more then one request", id);
  }
  pending[id].clients.push(res);
});

app_state.server.get("/groundspeed/:id", (req, res) => {
  if (!app_state.online) {
    res.status(404).end();
    return;
  }
  if (!app_state.simConnect.isConnected()) {
    resetConnection();
    res.status(404).json({});
    return;
  }
  const id = Number.parseInt(req.params.id);
  console.log("Received request for object:", id);
  if (failed[id]) {
    if (failed[id] < 10) {
      failed[id] += 1;
      res.status(404).json({ message: "Unknown SimObject" });
      return;
    }
    delete failed[id];
  }
  if (!pendingSpeed[id]) {
    app_state.receiver.requestSimulatorDataForId(
      app_state.dataDefSpeed,
      SimulatorDataPeriod.Once,
      id,
    );
    pendingSpeed[id] = {
      clients: [],
      tm: setTimeout(() => {
        console.log("Request timed out", id);
        failed[id] = 0;
        for (const client of pendingSpeed[id].clients) {
          try {
            client.status(408).json({ message: "msfs did not answer" });
          } catch {}
        }
        delete pendingSpeed[id];
      }, 1000),
    };
  } else {
    console.warn("batch more then one request", id);
  }
  pendingSpeed[id].clients.push(res);
});

const healthServer = express();

healthServer.get("/health", (req, res) => {
  res.json({ message: "ok" });
});

healthServer.get("/kill", (req, res) => {
  process.exit(0);
});

healthServer.listen(8339);

const s = app_state.server.listen(0, () => {
  app_state.port = s.address().port;
  console.log(app_state.port);
  connect();
});
