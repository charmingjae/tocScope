import React, { useState, useEffect } from "react";
import style from "../css/navigator.module.css";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";

const Navigator = () => {
  let history = useHistory();
  const location = useLocation();
  const getLocal = localStorage.getItem("userInfo");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setUserId(getLocal);
    console.log("Location is changed");
  }, [getLocal, location]);

  const doLogout = () => {
    localStorage.setItem("userInfo", "");
    setUserId(localStorage.getItem("userInfo"));
    console.log(typeof userId);
    console.log("kk", userId === "");
    history.push("/");
  };
  return (
    <div className={`${style.mainDiv}`}>
      <Link to="/" className={`${style.linkTitle}`}>
        <span className={`${style.title}`}>
          <b>TOC!</b>
        </span>
      </Link>

      {userId !== "" && userId != null ? (
        <div className={`${style.btnDiv}`}>
          {/* <Link to="/mod3in" className={`${style.Link}`}>
            
              <button className={`${style.btnSign}`}>@{getLocal}</button>
          </Link> */}

          {/* dropdown test */}
          <div>
            <button className={`${style.btnSign}`}>@{getLocal}</button>
          </div>
          {/* <Link className={`${style.Link}`}> */}
          {/* 로그인 시 아이디 표시 */}
          <button className={`${style.btnSign}`} onClick={doLogout}>
            로그아웃
          </button>
          {/* </Link> */}
        </div>
      ) : (
        <div className={`${style.btnDiv}`}>
          <Link to="/signin" className={`${style.Link}`}>
            <button className={`${style.btnSign}`}>Sign In</button>
          </Link>
          <Link to="/signup" className={`${style.Link}`}>
            <button className={`${style.btnSign}`}>Sign Up</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navigator;
