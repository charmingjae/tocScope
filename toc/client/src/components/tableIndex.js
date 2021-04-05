import React, { useState, useMemo } from "react";
import Axios from "axios";
import Table from "./table";
import address from "../servRoute";

function TableIndex() {
  const [viewContents, setViewContents] = useState([]);

  //   const columns = ["index", "Student", "1in-1", "1in-2", "2in", "3in"];
  //   idx, stu_name, fst1in, scd1in, stu2in, stu3in
  const columns = useMemo(
    () => [
      {
        accessor: "idx",
        Header: "index",
      },
      {
        accessor: "stu_name",
        Header: "Student",
      },
      {
        accessor: "fst1in",
        Header: "1in-1",
      },
      {
        accessor: "scd1in",
        Header: "1in-2",
      },
      {
        accessor: "stu2in",
        Header: "2in",
      },
      {
        accessor: "stu3in",
        Header: "3in",
      },
    ],
    []
  );

  // useEffect 마지막 파라미터에 빈 배열 넣으면 한 번만 실행한다는 뜻이다.
  useMemo(() => {
    Axios.get(address + "/api/get/3in").then((response) => {
      setViewContents(response.data);
      console.log(response.data);
    });
  }, []);

  return <Table columns={columns} data={viewContents} />;
}

export default TableIndex;
