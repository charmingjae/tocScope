import React, { useState, useMemo } from "react";
import Axios from "axios";
import ResetPwTable from "./resetPwTable";
import address from "../servRoute";

function ResetPwTableIndex() {
  const [viewContents, setViewContents] = useState([]);

  const columns = useMemo(
    () => [
      {
        accessor: "idx",
        Header: "index",
      },
      {
        accessor: "requestID",
        Header: "request ID",
      },
    ],
    []
  );

  // useEffect 마지막 파라미터에 빈 배열 넣으면 한 번만 실행한다는 뜻이다.
  useMemo(() => {
    Axios.get(address + "/api/get/resetPw").then((response) => {
      setViewContents(response.data);
      console.log(response.data);
    });
  }, []);

  return <ResetPwTable columns={columns} data={viewContents} />;
}

export default ResetPwTableIndex;
