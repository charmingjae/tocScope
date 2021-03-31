import React, { useMemo, useState } from "react";
import Axios from "axios";
import Toc3inTable from "./mod3inTable";

function Mod3in() {
  const [viewContents, setViewContents] = useState([]);

  //   const columns = ["index", "Student", "1in-1", "1in-2", "2in", "3in"];
  //   idx, stu_name, fst1in, scd1in, stu2in, stu3in
  const columns = useMemo(
    () => [
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
  // localstorage의 아이디 값을 보내고 리턴 받아오는거 구현하기
  useMemo(() => {
    Axios.post("http://localhost:1234/api/post/mod3in", {
      userID: localStorage.getItem("userInfo"),
    }).then((response) => {
      setViewContents(response.data);
    });
  }, []);

  return <Toc3inTable columns={columns} data={viewContents} />;
}

export default Mod3in;
