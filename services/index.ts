import { cloneDeep } from "lodash";
import { v4 } from "uuid";
import { MAX_HISTORY } from "../const";
import { IDataStatic, IHistory, IOptionsStatic } from "../models";
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
      date: Date.now(),
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

export const createOptions = (): IOptionsStatic => {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Request Statistics",
      },
    },
  };
};

export const createData = (array: IHistory[]): IDataStatic => {
  let countSuccess = 0;
  let countError = 0;
  array.forEach((item: IHistory) => {
    if (item.status) {
      countSuccess++;
    } else {
      countError++;
    }
  });
  return {
    labels: ["Request"],
    datasets: [
      {
        label: "Success",
        data: [countSuccess],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Error",
        data: [countError],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
};
