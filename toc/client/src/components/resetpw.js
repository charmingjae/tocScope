import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import style from "../css/resetpw.module.css";
import Axios from "axios";
import address from "../servRoute";

function ResetPW() {
  let history = useHistory();
  const [resetInfo, setResetInfo] = useState({
    requestID: "",
  });

  const submitID = () => {
    if (resetInfo.requestID === "") {
      alert("아이디를 입력해주세요.");
    } else {
      Axios.post(address + "/api/resetPW", resetInfo).then((result) => {
        if (result.data.result === 1) {
          alert("신청이 완료되었습니다.\n검토 후에 처리 해드리겠습니다! :>");
          history.push("/");
        } else {
          alert("해당 아이디가 없습니다.");
        }
      });
    }
  };

  const getValue = (e) => {
    const { name, value } = e.target;
    setResetInfo({
      ...resetInfo,
      [name]: value,
    });
  };

  return (
    <div className={`${style.mainDiv}`}>
      <div className={`${style.divInput}`}>
        <input
          className={`${style.inputID}`}
          placeholder="ID"
          name="requestID"
          onChange={getValue}
        ></input>
        <br />
        <br />
        <button
          className={`${style.btnResetPw}`}
          onClick={submitID}
          type="submit"
        >
          SUBMIT
        </button>
        <br />
        <br />
      </div>
    </div>
  );
}

export default ResetPW;
