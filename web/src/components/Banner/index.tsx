import React from "react";
import { useTranslation } from "react-i18next";

import style from "./Banner.module.scss";

import { bannerCar, bannerLogo } from "../../assets/images";

function Banner(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={style.mainWrapper}>
      <div className={style.image}></div>
      <img src={bannerLogo} className={style.logo} alt="logo" />
      <span className={style.text}>{t("Banner.Text")}</span>
    </div>
  );
}

export default Banner;
