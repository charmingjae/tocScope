import React from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import Search from "./Search";
import style from "../css/table.module.css";

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy);

  return (
    <>
      <div className={`${style.searchcomp}`}>
        <Search onSubmit={setGlobalFilter} />
      </div>
      <table {...getTableProps()} className={`${style.tableframe}`}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={`${style.tableth}`}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            if (row.cells[1].value === "차민재") {
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className={`${style.tabletd}`}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            } else {
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className={`${style.tabletd}`}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </>
  );
}

export default Table;
