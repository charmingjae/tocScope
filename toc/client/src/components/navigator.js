import React, { useState, useEffect, useRef } from "react";
import style from "../css/navigator.module.css";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import { useDetectOutsideClick } from "./useDetectOutsideClick";

const Navigator = () => {
  let history = useHistory();
  const location = useLocation();
  const getLocal = localStorage.getItem("userInfo");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setUserId(getLocal);
    console.log("Location is changed");
    if (isActive) {
      setIsActive(!isActive);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getLocal, location]);

  const doLogout = () => {
    localStorage.setItem("userInfo", "");
    setUserId(localStorage.getItem("userInfo"));
    console.log(typeof userId);
    console.log("kk", userId === "");
    setIsActive(!isActive);
    history.push("/");
  };

  // Dropdown func

  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);

  return (
    <>
      <div className={`${style.mainDiv}`}>
        <Link to="/" className={`${style.linkTitle}`}>
          <span className={`${style.title}`}>
            <b>TOC! ( beta )</b>
          </span>
        </Link>

        {userId !== "" && userId != null ? (
          <div className={`${style.btnDiv}`}>
            {/* <Link to="/mod3in" className={`${style.Link}`}>
              <button className={`${style.btnSign}`}>@{getLocal}</button>
            </Link> */}

            {/* 드롭다운 메뉴 */}
            <button onClick={onClick} className={`${style.btnSign}`}>
              @{getLocal}
            </button>

            {/* <Link className={`${style.Link}`}> */}
            {/* 로그인 시 아이디 표시 */}
            {/* <button className={`${style.btnSign}`} onClick={doLogout}>
              로그아웃
            </button> */}
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
      <div className={`${style.menuscontainer}`}>
        {/* <button onClick={onClick} className={`${style.menustrigger}`}>
          <span>User</span>
          <img
            src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg"
            alt="User avatar"
          />
        </button> */}
        <nav
          ref={dropdownRef}
          className={`${style.menu} ${
            isActive ? style.active : style.inactive
          }`}
        >
          <ul>
            <li>
              <Link to="/mod3in" className={`${style.Link}`}>
                <span>내 이수 현황</span>
              </Link>
            </li>
            <li>
              <Link to="/chngPW" className={`${style.Link}`}>
                <span>비밀번호 변경</span>
              </Link>
            </li>
            {localStorage.getItem("userInfo") === "202147019" ? (
              <li>
                <Link to="/get/resetPW" className={`${style.Link}`}>
                  <span>초기화 신청</span>
                </Link>
              </li>
            ) : null}
            <li>
              <span onClick={doLogout}>로그아웃</span>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navigator;
