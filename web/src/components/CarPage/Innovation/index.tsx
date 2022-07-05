import React from "react";
import { useTranslation } from "react-i18next";

import style from "./Innovation.module.scss";

import defaultImage from "../../../assets/images/innovation-background.png";

type Props = {
  image?: string;
};

function Innovation({ image }: Props): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={style.mainWrapper}>
      <div className={style.textWrapper}>
        <div className={style.headerContainer}>
          <div className={style.header}>{t("CarPage.Innovation.Header")}</div>
          <div className={style.headerStrong}>
            {t("CarPage.Innovation.HeaderStrong")}
          </div>
        </div>
        <ul className={style.textList}>
          <li className={style.textList__item}>
            {t("CarPage.Innovation.Text1")}
          </li>
          <li className={style.textList__item}>
            {t("CarPage.Innovation.Text2")}
          </li>
          <li className={style.textList__item}>
            {t("CarPage.Innovation.Text3")}
          </li>
        </ul>
      </div>
      <div className={style.imageWrapper}>
        <img
          src={image ? image : defaultImage}
          alt="innovation"
          className={style.image}
        />
      </div>
    </div>
  );
}

export default Innovation;
