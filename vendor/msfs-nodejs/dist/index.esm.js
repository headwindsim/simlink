var simconnect$4 = require('./libs/simconnect');
var Connection = simconnect$4.ConnectionBindings;

var ClientDataOffsetAuto = -1;
var ClientDataMaxSize = 8192;
var ClientDataType;
(function (ClientDataType) {
    ClientDataType[ClientDataType["Int8"] = -1] = "Int8";
    ClientDataType[ClientDataType["Int16"] = -2] = "Int16";
    ClientDataType[ClientDataType["Int32"] = -3] = "Int32";
    ClientDataType[ClientDataType["Int64"] = -4] = "Int64";
    ClientDataType[ClientDataType["Float32"] = -5] = "Float32";
    ClientDataType[ClientDataType["Float64"] = -6] = "Float64";
})(ClientDataType || (ClientDataType = {}));
var ClientDataPeriod;
(function (ClientDataPeriod) {
    ClientDataPeriod[ClientDataPeriod["Never"] = 0] = "Never";
    ClientDataPeriod[ClientDataPeriod["Once"] = 1] = "Once";
    ClientDataPeriod[ClientDataPeriod["VisualFrame"] = 2] = "VisualFrame";
    ClientDataPeriod[ClientDataPeriod["OnSet"] = 3] = "OnSet";
    ClientDataPeriod[ClientDataPeriod["Second"] = 4] = "Second";
})(ClientDataPeriod || (ClientDataPeriod = {}));
var ClientDataRequest;
(function (ClientDataRequest) {
    ClientDataRequest[ClientDataRequest["Default"] = 0] = "Default";
    ClientDataRequest[ClientDataRequest["Changed"] = 1] = "Changed";
    ClientDataRequest[ClientDataRequest["Tagged"] = 2] = "Tagged";
})(ClientDataRequest || (ClientDataRequest = {}));

var SimulatorDataType;
(function (SimulatorDataType) {
    SimulatorDataType[SimulatorDataType["Invalid"] = 0] = "Invalid";
    SimulatorDataType[SimulatorDataType["Int32"] = 1] = "Int32";
    SimulatorDataType[SimulatorDataType["Int64"] = 2] = "Int64";
    SimulatorDataType[SimulatorDataType["Float32"] = 3] = "Float32";
    SimulatorDataType[SimulatorDataType["Float64"] = 4] = "Float64";
    SimulatorDataType[SimulatorDataType["String8"] = 5] = "String8";
    SimulatorDataType[SimulatorDataType["String32"] = 6] = "String32";
    SimulatorDataType[SimulatorDataType["String64"] = 7] = "String64";
    SimulatorDataType[SimulatorDataType["String128"] = 8] = "String128";
    SimulatorDataType[SimulatorDataType["String256"] = 9] = "String256";
    SimulatorDataType[SimulatorDataType["String260"] = 10] = "String260";
    SimulatorDataType[SimulatorDataType["StringVariable"] = 11] = "StringVariable";
    SimulatorDataType[SimulatorDataType["InitPosition"] = 12] = "InitPosition";
    SimulatorDataType[SimulatorDataType["MarkerState"] = 13] = "MarkerState";
    SimulatorDataType[SimulatorDataType["Waypoint"] = 14] = "Waypoint";
    SimulatorDataType[SimulatorDataType["LatLongAlt"] = 15] = "LatLongAlt";
    SimulatorDataType[SimulatorDataType["XYZ"] = 16] = "XYZ";
})(SimulatorDataType || (SimulatorDataType = {}));
var SimulatorDataPeriod;
(function (SimulatorDataPeriod) {
    SimulatorDataPeriod[SimulatorDataPeriod["Never"] = 0] = "Never";
    SimulatorDataPeriod[SimulatorDataPeriod["Once"] = 1] = "Once";
    SimulatorDataPeriod[SimulatorDataPeriod["VisualFrame"] = 2] = "VisualFrame";
    SimulatorDataPeriod[SimulatorDataPeriod["SimFrame"] = 3] = "SimFrame";
    SimulatorDataPeriod[SimulatorDataPeriod["Second"] = 4] = "Second";
})(SimulatorDataPeriod || (SimulatorDataPeriod = {}));
var SimulatorDataWaypointFlags;
(function (SimulatorDataWaypointFlags) {
    SimulatorDataWaypointFlags[SimulatorDataWaypointFlags["SpeedRequested"] = 4] = "SpeedRequested";
    SimulatorDataWaypointFlags[SimulatorDataWaypointFlags["ThrottleRequested"] = 8] = "ThrottleRequested";
    SimulatorDataWaypointFlags[SimulatorDataWaypointFlags["ComputeVerticalSpeed"] = 16] = "ComputeVerticalSpeed";
    SimulatorDataWaypointFlags[SimulatorDataWaypointFlags["AltitudeIsAGL"] = 32] = "AltitudeIsAGL";
    SimulatorDataWaypointFlags[SimulatorDataWaypointFlags["OnGround"] = 1048576] = "OnGround";
    SimulatorDataWaypointFlags[SimulatorDataWaypointFlags["Reverse"] = 2097152] = "Reverse";
    SimulatorDataWaypointFlags[SimulatorDataWaypointFlags["WrapToFirst"] = 4194304] = "WrapToFirst";
})(SimulatorDataWaypointFlags || (SimulatorDataWaypointFlags = {}));

var SystemEventType;
(function (SystemEventType) {
    SystemEventType[SystemEventType["OneSecond"] = 0] = "OneSecond";
    SystemEventType[SystemEventType["FourSeconds"] = 1] = "FourSeconds";
    SystemEventType[SystemEventType["SixHertz"] = 2] = "SixHertz";
    SystemEventType[SystemEventType["AircraftLoaded"] = 3] = "AircraftLoaded";
    SystemEventType[SystemEventType["Crashed"] = 4] = "Crashed";
    SystemEventType[SystemEventType["CrashReset"] = 5] = "CrashReset";
    SystemEventType[SystemEventType["FlightLoaded"] = 6] = "FlightLoaded";
    SystemEventType[SystemEventType["FlightSaved"] = 7] = "FlightSaved";
    SystemEventType[SystemEventType["FlightPlanActivated"] = 8] = "FlightPlanActivated";
    SystemEventType[SystemEventType["FlightPlanDeactivated"] = 9] = "FlightPlanDeactivated";
    SystemEventType[SystemEventType["Frame"] = 10] = "Frame";
    SystemEventType[SystemEventType["ObjectAdded"] = 11] = "ObjectAdded";
    SystemEventType[SystemEventType["ObjectRemoved"] = 12] = "ObjectRemoved";
    SystemEventType[SystemEventType["Pause"] = 13] = "Pause";
    SystemEventType[SystemEventType["PauseEX1"] = 14] = "PauseEX1";
    SystemEventType[SystemEventType["Paused"] = 15] = "Paused";
    SystemEventType[SystemEventType["PauseFrame"] = 16] = "PauseFrame";
    SystemEventType[SystemEventType["PositionChanged"] = 17] = "PositionChanged";
    SystemEventType[SystemEventType["Sim"] = 18] = "Sim";
    SystemEventType[SystemEventType["SimStart"] = 19] = "SimStart";
    SystemEventType[SystemEventType["SimStop"] = 20] = "SimStop";
    SystemEventType[SystemEventType["Sound"] = 21] = "Sound";
    SystemEventType[SystemEventType["Unpaused"] = 22] = "Unpaused";
    SystemEventType[SystemEventType["View"] = 23] = "View";
})(SystemEventType || (SystemEventType = {}));

var simconnect$3 = require('./libs/simconnect');
var SystemEvent = simconnect$3.SystemEventBindings;

var simconnect$2 = require('./libs/simconnect');
var ClientDataArea = simconnect$2.ClientDataAreaBindings;

var simconnect$1 = require('./libs/simconnect');
var SimulatorDataArea = simconnect$1.SimulatorDataAreaBindings;

var simconnect = require('./libs/simconnect');
var Dispatcher = simconnect.DispatcherBindings;

var Receiver = /** @class */ (function () {
    function Receiver(connection) {
        this.dispatcher = null;
        this.interval = null;
        this.callbacks = {
            open: null,
            quit: null,
            clientData: null,
            simulatorData: null,
            systemEvent: null,
            exception: null,
            error: null
        };
        this.dispatcher = new Dispatcher(connection);
    }
    Receiver.prototype.processDispatch = function () {
        var response = this.dispatcher.nextDispatch();
        if (response === null)
            return;
        switch (response.type) {
            case 'open':
                if (this.callbacks.open !== null)
                    this.callbacks.open(response.data);
                break;
            case 'quit':
                if (this.callbacks.quit !== null)
                    this.callbacks.quit();
                break;
            case 'clientData':
                if (this.callbacks.clientData !== null)
                    this.callbacks.clientData(response.data);
                break;
            case 'simulatorData':
                if (this.callbacks.simulatorData !== null)
                    this.callbacks.simulatorData(response.data);
                break;
            case 'systemEvent':
                if (this.callbacks.systemEvent !== null)
                    this.callbacks.systemEvent(response.data);
                break;
            case 'exception':
                if (this.callbacks.exception !== null)
                    this.callbacks.exception(response.data);
                break;
            case 'error':
                if (this.callbacks.error !== null)
                    this.callbacks.error(response.data);
                break;
            default:
                throw Error('Unknown message type in the dispatcher');
        }
    };
    Receiver.prototype.addCallback = function (event, callback) {
        this.callbacks[event] = callback;
    };
    Receiver.prototype.start = function () {
        var _this = this;
        if (this.interval === null) {
            this.interval = setInterval(function () { return _this.processDispatch(); }, 50);
        }
    };
    Receiver.prototype.stop = function () {
        if (this.interval !== null) {
            clearInterval(this.interval);
            this.interval = null;
        }
    };
    Receiver.prototype.requestClientData = function (clientData, period, request) {
        return this.dispatcher.requestClientData(clientData, period, request);
    };
    Receiver.prototype.requestSimulatorData = function (simulatorData, period) {
        return this.dispatcher.requestSimulatorData(simulatorData, period);
    };
    Receiver.prototype.requestSimulatorDataForId = function (simulatorData, period, objectId) {
        return this.dispatcher.requestSimulatorDataForId(simulatorData, period, objectId);
    };
    Receiver.prototype.subscribeSystemEvent = function (systemEvent) {
        return this.dispatcher.subscribeSystemEvent(systemEvent);
    };
    Receiver.prototype.unsubscribeSystemEvent = function (systemEvent) {
        return this.dispatcher.unsubscribeSystemEvent(systemEvent);
    };
    return Receiver;
}());

var SystemEventObjectType;
(function (SystemEventObjectType) {
    SystemEventObjectType[SystemEventObjectType["User"] = 0] = "User";
    SystemEventObjectType[SystemEventObjectType["All"] = 1] = "All";
    SystemEventObjectType[SystemEventObjectType["Aircraft"] = 2] = "Aircraft";
    SystemEventObjectType[SystemEventObjectType["Helicopter"] = 3] = "Helicopter";
    SystemEventObjectType[SystemEventObjectType["Boat"] = 4] = "Boat";
    SystemEventObjectType[SystemEventObjectType["Ground"] = 5] = "Ground";
})(SystemEventObjectType || (SystemEventObjectType = {}));
var SystemEventPauseType;
(function (SystemEventPauseType) {
    SystemEventPauseType[SystemEventPauseType["Unpaused"] = 0] = "Unpaused";
    SystemEventPauseType[SystemEventPauseType["FullPause"] = 1] = "FullPause";
    SystemEventPauseType[SystemEventPauseType["PauseWithSound"] = 2] = "PauseWithSound";
    SystemEventPauseType[SystemEventPauseType["ActivePause"] = 4] = "ActivePause";
    SystemEventPauseType[SystemEventPauseType["SimPause"] = 8] = "SimPause";
})(SystemEventPauseType || (SystemEventPauseType = {}));
var SystemEventViewType;
(function (SystemEventViewType) {
    SystemEventViewType[SystemEventViewType["Cockpit2D"] = 1] = "Cockpit2D";
    SystemEventViewType[SystemEventViewType["CockpitVirtual"] = 2] = "CockpitVirtual";
    SystemEventViewType[SystemEventViewType["Orthogonal"] = 4] = "Orthogonal";
})(SystemEventViewType || (SystemEventViewType = {}));

export { ClientDataArea, ClientDataMaxSize, ClientDataOffsetAuto, ClientDataPeriod, ClientDataRequest, ClientDataType, Connection, Dispatcher, Receiver, SimulatorDataArea, SimulatorDataPeriod, SimulatorDataType, SimulatorDataWaypointFlags, SystemEvent, SystemEventObjectType, SystemEventPauseType, SystemEventType, SystemEventViewType };
//# sourceMappingURL=index.esm.js.map
