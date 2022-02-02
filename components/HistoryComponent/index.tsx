import { observer } from "mobx-react";
import { useContext, useMemo } from "react";
import styled from "styled-components";
import { IColumn, IDataStatic, IOptionsStatic } from "../../models";
import { createDataStatic, createDataSin, createOptionsSin, createOptionsStatic } from "../../services";
import { ConsoleStoreContext } from "../../store/consoleStore";
import ChartSin from "../Charts/ChartSin/ChartSin";
import ChartStatic from "../Charts/ChartStatic/ChartStatic";
import Header from "../Header";
import Main from "../Main/Main";
import Table from "../Table/Table";

const Wrapper = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 50px 1fr;
`;

const WrapperChartStatic = styled.div`
  width: 80%;
  margin-top: 50px;
`;

const WrapperChartSin = styled.div`
  width: 60%;
  margin-top: 50px;
`;

const HistoryComponent = observer((): JSX.Element => {
  const consoleStore = useContext(ConsoleStoreContext);
  const columns: IColumn[] = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Body",
        accessor: "request",
      },
      {
        Header: "Date",
        accessor: "date",
      },
    ],
    []
  );

  const optionsStatic: IOptionsStatic = useMemo(
    () => createOptionsStatic("Request Statistics"),
    []
  );

  const dataStatic: IDataStatic = useMemo(
    () => createDataStatic(consoleStore?.console.history!, ["Request"]),
    [consoleStore?.console.history]
  );

  const optionsSin: IOptionsStatic = useMemo(
    () => createOptionsSin("Request statistics for all time", consoleStore?.console.history!),
    [consoleStore?.console.history]
  );

  const dataSin: IDataStatic = useMemo(
    () => createDataSin(consoleStore?.console.history!),
    [consoleStore?.console.history]
  );

  return (
    <Wrapper>
      <Header />
      <Main variant="history">
        <Table columns={columns} data={consoleStore?.console.history} />
        <WrapperChartStatic>
          <ChartStatic options={optionsStatic} data={dataStatic} />
        </WrapperChartStatic>
        <WrapperChartSin>
          <ChartSin options={optionsSin} data={dataSin} />
        </WrapperChartSin>
      </Main>
    </Wrapper>
  );
});

export default HistoryComponent;
