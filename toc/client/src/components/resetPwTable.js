import React from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import Search from "./Search";
import style from "../css/table.module.css";
import Axios from "axios";
import address from "../servRoute";

function ResetPwTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy);

  const getValue = (e) => {
    console.log(e.target.id);
    const trGroup = Array.from(document.querySelectorAll("tbody tr"));
    const textGroup = trGroup.map((tr) => {
      return Array.from(tr.querySelectorAll("td")).map(
        (input) => input.innerText
      );
    });

    Axios.post(address + "/api/prog/resetPW", {
      requestID: textGroup[e.target.id][1],
    }).then((response) => {
      const getResult = response.data.result;
      if (getResult) {
        alert("초기화 완료");
      } else {
        alert("에러 발생");
      }
    });
  };

  var cnt = -1;

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
              <th className={`${style.tableth}`}>Process</th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            cnt += 1;
            return (
              <tr {...row.getRowProps()} id={cnt}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className={`${style.tabletd}`}>
                    {cell.render("Cell")}
                  </td>
                ))}
                <td className={`${style.tabletd}`}>
                  <button onClick={getValue} id={cnt}>
                    변경
                  </button>
                  <button>삭제</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default ResetPwTable;
