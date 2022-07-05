import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import style from "./Founder.module.scss";

import { commas, founderPortrait } from "../../../assets/images";

function Founder(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={style.mainWrapper}>
      <div className={style.mainContainer}>
        <img
          className={style.portrait}
          src={founderPortrait}
          alt="founder portrait"
        />
        <span className={style.name}>{t("MainPage.Founder.Name")}</span>
        <span className={style.position}>{t("MainPage.Founder.Position")}</span>
        <img className={style.quoteImage} src={commas} alt="quotes" />
        <p className={style.quote}>{t("MainPage.Founder.Quote")}</p>
      </div>
    </div>
  );
}

export default Founder;
