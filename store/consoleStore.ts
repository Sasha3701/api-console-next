import { configure, makeAutoObservable } from "mobx";
import { enableStaticRendering } from "mobx-react";
import { makePersistable, stopPersisting } from "mobx-persist-store";
import sendsay from "../api";
import { getCookie } from "../utils";
import { KEY_COOKIE } from "../const";
import { createContext } from "react";
import { IHistory, nullableTypes } from "../models";

configure({ enforceActions: "observed" });

const isServer = typeof window === "undefined";
enableStaticRendering(isServer);

export interface IConsoleState {
  widthIn: nullableTypes<number>;
  history: IHistory[];
}

class ConsoleStore {
  console: IConsoleState = {
    widthIn: null,
    history: [
      {
        id: "1",
        request: '{\n  "action": "sys.settings.get"\n}',
        status: true,
        title: "sys.settings.get",
      },
      {
        id: "2",
        request: '{\n  "action": "pong"\n}',
        status: true,
        title: "pong",
      },
    ],
  };

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "console",
      properties: ["console"],
      storage: typeof window === "undefined" ? undefined : window.localStorage,
    });
  }

  stopStore() {
    stopPersisting(this);
  }

  value: string = "";
  valueResponse: string = "";
  errorRequest: boolean = false;
  loadingConsole: boolean = false;
  errorResponse: boolean = false;
}

export default ConsoleStore;

export const ConsoleStoreContext = createContext<ConsoleStore | null>(null);
