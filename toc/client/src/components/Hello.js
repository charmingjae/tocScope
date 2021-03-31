import React from "react";
import { Link } from "react-router-dom";
import style from "../css/index.module.css";

function Hello() {
  return (
    <Link to="/scope3in">
      <button className={`${style.btnShowdata}`}>데이터 보기</button>
    </Link>
  );
}

export default Hello;
