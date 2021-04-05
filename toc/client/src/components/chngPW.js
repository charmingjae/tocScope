import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import style from "../css/chngPW.module.css";
import Axios from "axios";
import address from "../servRoute";

function SignUp() {
  let history = useHistory();
  const [passwordInfo, setPasswordInfo] = useState({
    currentPW: "",
    chngPW: "",
    confChngPW: "",
  });

  // 현재 비밀번호가 맞는지 아닌지 확인
  // 비밀번호가 맞으면 변경할 비밀번호하고 한 번 더 입력한 비밀번호가 맞는지 확인
  // 나중에 합시다
  const submitReview = () => {
    // 서버에 요청해서 값 가져오기
    var getValue = "";
    Axios.post(address + "/api/getPw", {
      userID: localStorage.getItem("userInfo"),
      userPW: passwordInfo.currentPW,
    }).then((response) => {
      getValue = response.data.result;
      if (getValue) {
        if (passwordInfo.chngPW === "" || passwordInfo.confChngPW === "") {
          alert("비밀번호를 입력 해주세요.");
        } else {
          if (passwordInfo.chngPW === passwordInfo.confChngPW) {
            Axios.post(address + "/api/updatepw", {
              userID: localStorage.getItem("userInfo"),
              chngPW: passwordInfo.confChngPW,
            }).then((resonse) => {
              if (response) {
                alert("변경 완료!");
                history.push("/");
              }
            });
          } else {
            alert("비밀번호가 다릅니다.");
          }
        }
      } else {
        alert("비밀번호가 다릅니다.");
      }
    });
    // if (
    //   passwordInfo.currentPW === "" ||
    //   passwordInfo.chngPW === "" ||
    //   passwordInfo.confChngPW === ""
    // ) {
    //   alert("입력한 정보를 확인해주세요.");
    // } else if (signupInfo.userPW !== signupInfo.userPWconfirm) {
    //   alert("비밀번호를 확인해주세요.");
    // } else {
    //   Axios.post("/api/insert", {
    //     userID: signupInfo.userID,
    //     userPW: signupInfo.userPW,
    //   }).then((result) => {
    //     var getResult = result.data.result;
    //     if (getResult === 0) {
    //       alert("이미 사용 중인 아이디 입니다.");
    //     } else {
    //       alert("회원가입 성공!");
    //       history.push("/signin");
    //     }
    //   });
    // }
  };

  const getValue = (e) => {
    const { name, value } = e.target;
    setPasswordInfo({
      ...passwordInfo,
      [name]: value,
    });
    console.log(passwordInfo);
  };

  return (
    <div className={`${style.mainDiv}`}>
      <div className={`${style.divInput}`}>
        <input
          className={`${style.inputPW}`}
          placeholder="현재 비밀번호"
          type="password"
          name="currentPW"
          onChange={getValue}
        ></input>
        <br />
        <br />
        <input
          className={`${style.inputPW}`}
          placeholder="변경할 비밀번호"
          type="password"
          name="chngPW"
          onChange={getValue}
        ></input>
        <br />
        <br />
        <input
          className={`${style.inputPW}`}
          placeholder="변경할 비밀번호 확인"
          type="password"
          name="confChngPW"
          onChange={getValue}
        ></input>
        <br />
        <br />
        <button
          className={`${style.btnSignUp}`}
          onClick={submitReview}
          type="submit"
        >
          변경하기
        </button>
      </div>
    </div>
  );
}

export default SignUp;
