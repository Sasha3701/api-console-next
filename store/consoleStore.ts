import { configure, makeAutoObservable } from "mobx";
import { enableStaticRendering } from "mobx-react";
import { makePersistable, stopPersisting } from "mobx-persist-store";
import sendsay from "../api";
import { formatJson, getCookie, isJsonString, jsonFromStr } from "../utils";
import { KEY_COOKIE } from "../const";
import { createContext } from "react";
import { IError, IHistory, nullableTypes } from "../models";
import { addHistory } from "../services";
import { cloneDeep } from "lodash";

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
        date: 1643754864879,
      },
      {
        id: "2",
        request: '{\n  "action": "pong"\n}',
        status: true,
        title: "pong",
        date: 1643754864872,
      },
    ],
  };

  value: string = "";
  valueResponse: string = "";
  errorRequest: boolean = false;
  loadingConsole: boolean = false;
  errorResponse: boolean = false;

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

  hydrate(data: IConsoleState) {
    this.console =
      data != null
        ? data
        : {
            widthIn: null,
            history: [
              {
                id: "1",
                request: '{\n  "action": "sys.settings.get"\n}',
                status: true,
                title: "sys.settings.get",
                date: 1643754864879,
              },
              {
                id: "2",
                request: '{\n  "action": "pong"\n}',
                status: true,
                title: "pong",
                date: 1643754864872,
              },
            ],
          };
  }

  changeSize(size: number) {
    this.console.widthIn = size;
  }

  clearHistory() {
    this.console.history = [];
  }

  changeConsole(data: string) {
    this.value = data;
    this.errorRequest = !isJsonString(data);
  }

  async consoleRequest(data: string) {
    this.loadingConsole = true;
    const request = jsonFromStr(data) as Record<string, any>;
    try {
      const res = await sendsay.request({
        session: getCookie(KEY_COOKIE),
        ...request,
      });
      this.consoleSuccess(res);
    } catch (e) {
      this.consoleFailer(e as IError);
    }
  }

  consoleSuccess(res: Record<string, any>) {
    const result: string = formatJson(res);
    this.valueResponse = result;
    this.errorResponse = false;
    this.loadingConsole = false;
    this.console.history = addHistory(this, true);
  }

  consoleFailer(e: IError) {
    const result: string = formatJson(e as Record<string, any>);
    this.console.history = addHistory(this, false);
    this.valueResponse = result;
    this.errorResponse = true;
    this.loadingConsole = false;
  }

  consoleFormat(data: string) {
    this.value = formatJson(data);
    this.errorRequest = false;
  }

  deleteItemHistory(id: string) {
    this.console.history = cloneDeep(this.console.history).filter(
      (item: IHistory) => item.id !== id
    );
  }

  consoleErrorRequest(status: boolean) {
    this.errorRequest = status;
  }
}

export default ConsoleStore;

export const ConsoleStoreContext = createContext<ConsoleStore | null>(null);
