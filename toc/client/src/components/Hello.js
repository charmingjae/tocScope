import React from "react";
import { Link } from "react-router-dom";
import style from "../css/index.module.css";

function Hello() {
  return (
    <button className={`${style.btnShowdata}`}>
      <Link to="/scope3in" className={`${style.dataBtnLink}`}>
        데이터 보기
      </Link>
    </button>
  );
}

export default Hello;
