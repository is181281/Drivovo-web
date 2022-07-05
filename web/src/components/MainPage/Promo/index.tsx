import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import style from "./Promo.module.scss";

import config from "../../../config";
import CustomSelect from "../../CustomSelect";
import {
  audiq8s,
  audiq8s_hover,
  ds7crossback,
  ds7crossback_hover,
  volvoxc40,
  volvoxc40_hover,
  vwgolfgti,
  vwgolfgti_hover,
  vwtiguan,
  vwtiguan_hover,
} from "../../../assets/images/promo-cars";
import { setIsShowMailingPopup } from "../../../store/slices/mailing";
import { useAppDispatch } from "../../../hooks";
import analyticsService from "../../../service/analytics";

const carsForSlider = [
  {
    model: "Volkswagen Tiguan R-line",
    image: vwtiguan,
    imageHover: vwtiguan_hover,
  },
  {
    model: "Audi Q8 S",
    image: audiq8s,
    imageHover: audiq8s_hover,
  },
  {
    model: "Volvo xc40 recharge pure electric",
    image: volvoxc40,
    imageHover: volvoxc40_hover,
  },
  {
    model: "DS7 Crossback",
    image: ds7crossback,
    imageHover: ds7crossback_hover,
  },
  {
    model: "Volkswagen Golf GTI",
    image: vwgolfgti,
    imageHover: vwgolfgti_hover,
  },
];

function Promo(): JSX.Element {
  const { t } = useTranslation();
  const [currentCarIndex, setCurrentCarIndex] = useState(0);
  const [isMovingOut, setIsMovingOut] = useState(true);
  const [isMovingIn, setIsMovingIn] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <div className={style.mainWrapper}>
      <div className={style.sliderWrapper}>
        <div className={style.sliderWrapper__header}>
          {carsForSlider[currentCarIndex].model}
        </div>
        <div
          className={`${style.sliderWrapper__image__container} ${
            isMovingIn ? style.overflowHidden : ""
          }`}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <img
            onAnimationEnd={() => {
              if (isMovingOut) {
                setIsMovingOut(false);
                setIsMovingIn(true);
                setCurrentCarIndex(
                  currentCarIndex + 1 === carsForSlider.length
                    ? 0
                    : currentCarIndex + 1
                );
              } else {
                setIsMovingOut(true);
                setIsMovingIn(false);
              }
            }}
            className={`${style.sliderWrapper__image} ${
              isMovingOut ? style.sliderWrapper__image__movingOut : ""
            } ${isMovingIn ? style.sliderWrapper__image__movingIn : ""}`}
            alt="car"
            src={
              isHover
                ? carsForSlider[currentCarIndex].imageHover
                : carsForSlider[currentCarIndex].image
            }
          />
        </div>
        <div className={style.sliderWrapper__dot__container}>
          {carsForSlider.map((car, index) => (
            <div
              className={`${style.sliderWrapper__dot} ${
                index === currentCarIndex
                  ? style.sliderWrapper__dot__active
                  : ""
              }`}
              key={`promodot ${index}`}
            ></div>
          ))}
        </div>
      </div>
      <div className={style.selectWrapper}>
        <div className={style.header}>{t("MainPage.Promo.Header")}</div>
        <div className={style.headerStrong}>
          {t("MainPage.Promo.HeaderStrong")}
        </div>
        <div className={style.text}>{t("MainPage.Promo.Text")}</div>
        <div className={style.selectContainer}>
          <CustomSelect />
        </div>
        {/* <a
          href={config.socialMediaLinks.hubspot}
          target="_blank"
          rel="noreferrer"
          className={style.navigationLink}
        >
          <div className={style.navigationLink__arrow}></div>
          <span>{t("MainPage.Promo.Link")}</span>
        </a> */}
        <div
          onClick={() => {
            dispatch(setIsShowMailingPopup(true));
            analyticsService.createFacebookEvent("Lead", {});
            analyticsService.createGAEvent("begin_checkout", {});
          }}
          className={style.navigationLink}
        >
          <div className={style.navigationLink__arrow}></div>
          <span>{t("MainPage.Promo.Link")}</span>
        </div>
      </div>
    </div>
  );
}

export default Promo;
