import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Benefit from "./Benefit";
import { benefits } from "./benefits";

import style from "./Benefits.module.scss";

function Benefits(): JSX.Element {
  return (
    <div className={style.mainWrapper}>
      {benefits.map((benefit) => (
        <Benefit image={benefit.image} text={benefit.text} key={benefit.key} />
      ))}
    </div>
  );
}

export default Benefits;
