import { observer } from "mobx-react";
import { useContext, useMemo } from "react";
import styled from "styled-components";
import { IColumn, IDataStatic, IOptionsStatic } from "../../models";
import { createData, createOptions } from "../../services";
import { ConsoleStoreContext } from "../../store/consoleStore";
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

  const options: IOptionsStatic = useMemo(() => createOptions(), []);

  const data: IDataStatic = useMemo(
    () => createData(consoleStore?.console.history!),
    [consoleStore?.console.history]
  );

  return (
    <Wrapper>
      <Header />
      <Main variant="history">
        <Table columns={columns} data={consoleStore?.console.history} />
        <WrapperChartStatic>
          <ChartStatic options={options} data={data} />
        </WrapperChartStatic>
      </Main>
    </Wrapper>
  );
});

export default HistoryComponent;
