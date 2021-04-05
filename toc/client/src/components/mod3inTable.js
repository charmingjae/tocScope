import React, { useState, useEffect } from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import style from "../css/mod3intable.module.css";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import address from "../servRoute";

function Toc3inTable({ columns, data }) {
  let history = useHistory();
  const { headerGroups } = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy
  );

  const [tocInfo, setTocInfo] = useState({
    fst1in: "",
    scd1in: "",
    stu2in: "",
    stu3in: "",
  });

  const chngeValue = (e) => {
    const { name, value } = e.target;
    setTocInfo({
      ...tocInfo,
      [name]: value,
    });
    console.log(tocInfo);
  };

  const submitTocinfo = () => {
    Axios.post(address + "/api/prog/mod3in", {
      tocData: tocInfo,
      userID: localStorage.getItem("userInfo"),
    }).then(() => {
      alert("수정 완료!");
      history.push("/scope3in");
    });
  };

  useEffect(() => {
    if (data.length === 0) {
    } else {
      setTocInfo({
        ...tocInfo,
        fst1in: data[0].fst1in,
        scd1in: data[0].scd1in,
        stu2in: data[0].stu2in,
        stu3in: data[0].stu3in,
      });
      // console.log(tocInfo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  console.log(data);
  console.log("data : ", tocInfo);

  return (
    <>
      <table className={`${style.tableframe}`}>
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
        <tbody>
          {data.map((row) => {
            console.log(row.fst1in);
            return (
              <tr key="tr1">
                <td key="td1" className={`${style.tabletd}`}>
                  <select
                    key="sel1"
                    name="fst1in"
                    onChange={chngeValue}
                    defaultValue={row.fst1in}
                  >
                    <option key={row.fst1in + 1} value={row.fst1in} disabled>
                      {row.fst1in}
                    </option>
                    <option key="미이수" value="미이수">
                      미이수
                    </option>
                  </select>
                </td>
                <td key="td2" className={`${style.tabletd}`}>
                  <select
                    key="sel2"
                    name="scd1in"
                    onChange={chngeValue}
                    defaultValue={row.scd1in}
                  >
                    <option key={row.scd1in + 1} value={row.scd1in} disabled>
                      {row.scd1in}
                    </option>
                    <option key="미이수" value="미이수">
                      미이수
                    </option>
                    <option
                      key="창의융합을위한3D프린팅체험튜터링"
                      value="창의 융합을 위한 3D프린팅 체험 튜터링"
                    >
                      창의 · 융합을 위한 3D프린팅 체험 튜터링
                    </option>
                  </select>
                </td>
                <td key="td3" className={`${style.tabletd}`}>
                  <select
                    key="sel3"
                    name="stu2in"
                    onChange={chngeValue}
                    defaultValue={row.stu2in}
                  >
                    <option key={row.stu2in + 1} value={row.stu2in} disabled>
                      {row.stu2in}
                    </option>
                    <option key="미이수" value="미이수">
                      미이수
                    </option>
                    <option
                      key="SOC들어오는노트공모전"
                      value="SOC 들어오는 노트 공모전"
                    >
                      SOC 들어오는 노트 공모전
                    </option>
                  </select>
                </td>
                <td key="td4" className={`${style.tabletd}`}>
                  <select
                    key="sel4"
                    name="stu3in"
                    onChange={chngeValue}
                    defaultValue={row.stu3in}
                  >
                    <option key={row.stu3in + 1} value={row.stu3in} disabled>
                      {row.stu3in}
                    </option>
                    <option key="미이수" value="미이수">
                      미이수
                    </option>
                    <option key="TOC튀는멘토링" value="TOC 튀는 멘토링">
                      TOC 튀는 멘토링
                    </option>
                    <option key="FLY튜터링" value="FLY 튜터링">
                      FLY 튜터링
                    </option>
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        onClick={submitTocinfo}
        type="submit"
        className={`${style.btnModify}`}
      >
        저장하기
      </button>
    </>
  );
}

export default Toc3inTable;
