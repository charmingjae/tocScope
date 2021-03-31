import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import style from "../css/signup.module.css";
import Axios from "axios";

function SignUp() {
  let history = useHistory();
  const [signupInfo, setSignupInfo] = useState({
    userID: "",
    userPW: "",
    userPWconfirm: "",
  });

  const submitReview = () => {
    if (
      signupInfo.userPW === "" ||
      signupInfo.userPWconfirm === "" ||
      signupInfo.userID === ""
    ) {
      alert("입력한 정보를 확인해주세요.");
    } else if (signupInfo.userPW !== signupInfo.userPWconfirm) {
      alert("비밀번호를 확인해주세요.");
    } else {
      Axios.post("http://localhost:1234/api/insert", {
        userID: signupInfo.userID,
        userPW: signupInfo.userPW,
      }).then((result) => {
        var getResult = result.data.result;
        if (getResult === 0) {
          alert("이미 사용 중인 아이디 입니다.");
        } else {
          alert("회원가입 성공!");
          history.push("/signin");
        }
      });
    }
  };

  const getValue = (e) => {
    const { name, value } = e.target;
    setSignupInfo({
      ...signupInfo,
      [name]: value,
    });
    console.log(signupInfo);
  };

  return (
    // <form onSubmit={submitReview}>
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
          type="password"
          name="userPW"
          onChange={getValue}
        ></input>
        <br />
        <br />
        <input
          className={`${style.inputPW}`}
          placeholder="PW_CONFIRM"
          type="password"
          name="userPWconfirm"
          onChange={getValue}
        ></input>
        <br />
        <br />
        <button
          className={`${style.btnSignUp}`}
          onClick={submitReview}
          type="submit"
        >
          SIGN UP
        </button>
      </div>
      {/* <div>
          {viewContents.map((element) => (
            <div>
              <h2 key="{element.userID}">{element.userID}</h2>
              <h2 key="{element.userPW}">{element.userPW}</h2>
            </div>
          ))}
        </div> */}
    </div>
    // </form>
  );
}

export default SignUp;
