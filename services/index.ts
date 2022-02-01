import { cloneDeep } from "lodash";
import { v4 } from "uuid";
import { MAX_HISTORY } from "../const";
import { IHistory } from "../models";
import ConsoleStore from "../store/consoleStore";
import { formatJson, jsonFromStr } from "../utils";

export const addHistory = (
  state: ConsoleStore,
  status: boolean
): IHistory[] => {
  const newHistory = cloneDeep(state.console.history).find(
    (item) => formatJson(item.request) === formatJson(state.value)
  );
  if (!newHistory || state.console.history.length === 0) {
    const requestObj = jsonFromStr(state.value) as Record<string, any>;
    const currentNewHistory: IHistory = {
      id: v4(),
      status,
      title: requestObj.action,
      request: formatJson(state.value),
      date: Date.now()
    };
    return state.console.history.length >= MAX_HISTORY
      ? [
          currentNewHistory,
          ...cloneDeep(state.console.history).slice(
            0,
            state.console.history.length - 1
          ),
        ]
      : [currentNewHistory, ...cloneDeep(state.console.history)];
  }
  return [
    newHistory!,
    ...cloneDeep(state.console.history).filter(
      (item) => item.id !== newHistory!.id
    ),
  ];
};
