import React from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import Search from "./Search";
import style from "../css/resetTable.module.css";
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

  const doResetPw = (e) => {
    console.log(e.target.name);
    const trGroup = Array.from(document.querySelectorAll("tbody tr"));
    const textGroup = trGroup.map((tr) => {
      return Array.from(tr.querySelectorAll("td")).map(
        (input) => input.innerText
      );
    });

    Axios.post(address + "/api/prog/resetPW", {
      requestID: textGroup[e.target.name][1],
    }).then((response) => {
      const getResult = response.data.result;
      if (getResult) {
        alert("초기화 완료");
      } else {
        alert("에러 발생");
      }
    });
  };

  const doDeleteReq = (e) => {
    console.log(e.target.name);
    const trGroup = Array.from(document.querySelectorAll("tbody tr"));
    const textGroup = trGroup.map((tr) => {
      return Array.from(tr.querySelectorAll("td")).map(
        (input) => input.innerText
      );
    });

    Axios.post(address + "/api/prog/delReq", {
      requestID: textGroup[e.target.name][1],
    }).then((response) => {
      const getResult = response.data.result;
      if (getResult) {
        alert("삭제 완료");
        window.location.reload();
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
          {rows.length !== 0 ? (
            rows.map((row) => {
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
                    <button onClick={doResetPw} name={cnt}>
                      변경
                    </button>
                    <button onClick={doDeleteReq} name={cnt}>
                      삭제
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="3" className={`${style.tabletd}`}>
                초기화 신청자가 없습니다.
              </td>
            </tr>
          )}
          {/* {rows.map((row) => {
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
                  <button onClick={doResetPw} name={cnt}>
                    변경
                  </button>
                  <button onClick={doDeleteReq} name={cnt}>
                    삭제
                  </button>
                </td>
              </tr>
            );
          })} */}
        </tbody>
      </table>
    </>
  );
}

export default ResetPwTable;
