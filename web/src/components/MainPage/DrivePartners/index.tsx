import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  audi,
  bmw,
  peugeot,
  toyota,
  volkswagen,
  volvo,
} from "../../../assets/images";

import style from "./DrivePartners.module.scss";

const partners = [
  { name: "toyota", img: toyota },
  { name: "audi", img: audi },
  { name: "volkswagen", img: volkswagen },
  { name: "volvo", img: volvo },
  // { name: "bmw", img: bmw },
  { name: "peugeot", img: peugeot },
];

function DrivePartners(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={style.mainWrapper}>
      <div className={style.mainContainer}>
        <div className={style.headerContainer}>
          <span className={style.headerText}>
            {t("MainPage.DrivePartners.Header")}
          </span>
          <span className={style.headerTextStrong}>
            {t("MainPage.DrivePartners.HeaderStrong")}
          </span>
        </div>
        <div className={style.partnersContainer}>
          {partners.map((partner) => (
            <div
              className={`${style.partner} ${
                style[`partner__${partner.name}`]
              }`}
              key={`partner${partner.name}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DrivePartners;
