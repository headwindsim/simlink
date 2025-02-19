import SysTray from "systray2";
import path from "node:path";
import { hideConsole, showConsole } from "node-hide-console-window";

let isVisible = true;

const sysTray = new SysTray.default({
  menu: {
    icon: path.join(__dirname, "../assets/icon.ico"),
    title: "Headwind Simlink",
    tooltip: "Traffic Utility for Headwind",
    items: [
      {
        title: "Toogle Console",
        tooltip: "Toggle the visbilty of the console window",
        checked: false,
        enabled: true,
        click: () => {
          isVisible = !isVisible;
          if (isVisible) showConsole();
          else hideConsole();
        },
      },
      {
        title: "Exit",
        tooltip: "Kill the server",
        checked: false,
        enabled: true,
        click: () => {
          process.exit(0);
        },
      },
    ],
  },
  copyDir: path.dirname(process.argv[0]),
});

if (process.pkg) {
  hideConsole();
  isVisible = false;
}

sysTray.onClick((action) => {
  // eslint-disable-next-line no-prototype-builtins
  if (action.item.hasOwnProperty("click")) {
    const item = action.item;
    item.click();
  }
});
