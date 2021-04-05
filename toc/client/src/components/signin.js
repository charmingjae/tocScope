import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import style from "../css/signin.module.css";
import Axios from "axios";
import address from "../servRoute";

function SignIn() {
  let history = useHistory();
  const [signinInfo, setSigninInfo] = useState({
    userID: "",
    userPW: "",
  });

  const submitReview = () => {
    Axios.post(address + "/api/login", signinInfo).then((result) => {
      // alert("로그인 전송 완료!");
      console.log(result.data.result);
      if (result.data.result === 1) {
        localStorage.setItem("userInfo", signinInfo.userID);
        history.push("/");
      } else {
        alert("로그인 정보를 확인하세요.");
      }
    });
  };

  const getValue = (e) => {
    const { name, value } = e.target;
    setSigninInfo({
      ...signinInfo,
      [name]: value,
    });
    console.log(signinInfo);
  };

  return (
    <div className={`${style.mainDiv}`}>
      <div className={`${style.divInput}`}>
        <input
          className={`${style.inputID}`}
          placeholder="ID"
          name="userID"
          onChange={getValue}
        ></input>
        <br />
        <br />
        <input
          className={`${style.inputPW}`}
          placeholder="PW"
          name="userPW"
          type="password"
          onChange={getValue}
        ></input>
        <br />
        <br />
        <button
          className={`${style.btnSignIn}`}
          onClick={submitReview}
          type="submit"
        >
          SIGN IN
        </button>
      </div>
    </div>
  );
}

export default SignIn;
