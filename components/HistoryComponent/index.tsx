import { observer } from "mobx-react";
import { useContext, useMemo } from "react";
import styled from "styled-components";
import { IColumn } from "../../models";
import { ConsoleStoreContext } from "../../store/consoleStore";
import Header from "../Header";
import Main from "../Main/Main";
import Table from "../Table/Table";

const Wrapper = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 50px 1fr;
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

  return (
    <Wrapper>
      <Header />
      <Main variant="history">
        <Table columns={columns} data={consoleStore?.console.history} />
      </Main>
    </Wrapper>
  );
});

export default HistoryComponent;
