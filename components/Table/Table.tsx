import styled from "styled-components";
import { useTable } from "react-table";
import { IPropsTable } from "./Table.props";
import { IStatusRequest } from "../UI/Dropdown/Dropdown.props";

const StatusRequest = styled.span<IStatusRequest>`
  display: inline-block;
  height: 10px;
  width: 10px;
  box-sizing: border-box;
  background-color: ${({ statusRequest }): string =>
    statusRequest ? "var(--color-green)" : "var(--color-red)"};
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  margin-right: 5px;
`;

const CustomTable = styled.table`
  padding: 10px;
  border: 1px solid var(--color-gray-light);
  border-radius: 5px;
  border-spacing: 0px;
  width: 100%;
  background-color: var(--color-gray-medium);
`;
const CustomTableRow = styled.tr`
  padding: 5px;
  border: 1px solid var(--color-gray-light);
`;
const CustomTableColumn = styled.td`
  padding: 5px;
  text-align: center;
  border: 1px solid var(--color-gray-light);
  background-color: var(--text-colot-white);
`;
const CustomTableHeader = styled.th`
  padding: 5px;
  font-size: 16px;
  border: 1px solid var(--color-gray-light);
  background-color: var(--color-primary);
`;

const Table = ({ columns, data }: IPropsTable) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <CustomTable {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          // eslint-disable-next-line react/jsx-key
          <CustomTableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, i) => (
              // eslint-disable-next-line react/jsx-key
              <CustomTableHeader {...column.getHeaderProps()}>
                {column.render("Header")}
              </CustomTableHeader>
            ))}
          </CustomTableRow>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            // eslint-disable-next-line react/jsx-key
            <CustomTableRow {...row.getRowProps()}>
              {row.cells.map((cell) => {
                if (typeof cell.value === "boolean") {
                  return (
                    <CustomTableColumn {...cell.getCellProps()}>
                      <StatusRequest statusRequest={cell.value} />
                    </CustomTableColumn>
                  );
                } else if (cell.column.Header === "Date") {
                  return (
                    <CustomTableColumn {...cell.getCellProps()}>
                      {new Date(cell.value).toLocaleDateString("en-US")}
                    </CustomTableColumn>
                  );
                }
                return (
                  // eslint-disable-next-line react/jsx-key
                  <CustomTableColumn {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </CustomTableColumn>
                );
              })}
            </CustomTableRow>
          );
        })}
      </tbody>
    </CustomTable>
  );
};

export default Table;
