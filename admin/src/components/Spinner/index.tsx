import React from "react";
import style from "./Spinner.module.scss";

const Spinner = (): JSX.Element => (
  <div className={style.wrapper}>
    <div className={style.container}>
      <div className={style.element}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  </div>
);

export default Spinner;
