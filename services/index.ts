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

export const createOptionsStatic = (title: string): IOptionsStatic => {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };
};

export const createDataStatic = (
  array: IHistory[],
  labels: string[]
): IDataStatic => {
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
    labels,
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

export const createOptionsSin = (
  title: string,
  array: IHistory[]
): IOptionsStatic => {
  return {
    responsive: true,
    scales: {
      yAxis: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
      },
      tooltip: {
        callbacks: {
          title: () => '',
          footer: (tooltipItems: any) => {
            const customDate = +tooltipItems[0].formattedValue.replace(
              /\s/g,
              ""
            );
            return array.find((item: IHistory) => item.date == customDate)
              ?.request;
          },
          label: () => "",
        },
      },
    },
  };
};

export const createDataSin = (array: IHistory[]): IDataStatic => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: 'numeric',
  };
  const labels = array.map((item: IHistory) =>
    new Date(item.date).toLocaleDateString("en-US", options as any)  
  );
  return {
    labels,
    datasets: [
      {
        // label: "Request",
        data: array.map((item: IHistory) => item.date),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
};
