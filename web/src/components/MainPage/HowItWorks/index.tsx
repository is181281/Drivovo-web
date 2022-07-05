import React from "react";
import { useTranslation } from "react-i18next";

import style from "./HowItWorks.module.scss";

import config from "../../../config";
import analyticsService from "../../../service/analytics";
import { useAppDispatch, useTypedSelector } from "../../../hooks";
import { setIsShowMailingPopup } from "../../../store/slices/mailing";
import { current } from "@reduxjs/toolkit";

type Props = {
  id?: string;
};

function HowItWorks({ id }: Props): JSX.Element {
  const { t } = useTranslation();
  const { carsList } = useTypedSelector((state) => state.cars);
  const dispatch = useAppDispatch();

  const currentCar = carsList.find((car) => car.id === id);

  return (
    <div className={style.mainWrapper}>
      <div className={style.mainContainer}>
        <div className={style.image}></div>
        <div className={style.textContainer}>
          <div className={style.headerContainer}>
            <div>
              <span className={style.headerText}>
                {t("MainPage.HowItWorks.Header")}
              </span>
              <span className={style.headerTextStrong}>
                {t("MainPage.HowItWorks.HeaderStrong")}
              </span>
            </div>
          </div>
          {[1, 2, 3].map((item) => (
            <div className={style.step__container} key={`step${item}`}>
              <div className={`${style.step} ${style.step__number}`}>
                {item}
              </div>
              <div className={style.step__textContainer}>
                <div className={`${style.step} ${style.step__header}`}>
                  {t(`MainPage.HowItWorks.Step${item}.Header`)}
                </div>
                <div>
                  <span className={`${style.step} ${style.step__orange}`}>
                    {t(`MainPage.HowItWorks.Step${item}.Orange`)}
                  </span>
                  <span className={`${style.step} ${style.step__text}`}>
                    {t(`MainPage.HowItWorks.Step${item}.Text`)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={style.optionsWrapper}>
        <div className={style.optionContainer}>
          <div className={style.optionContainer__header}>
            {t("MainPage.HowItWorks.Option1Header")}
          </div>
          <div className={style.optionContainer__text}>
            {t("MainPage.HowItWorks.Option1Text")}
          </div>
        </div>
        <div className={style.optionContainer}>
          <div className={style.optionContainer__header}>
            {t("MainPage.HowItWorks.Option2Header")}
          </div>
          <div className={style.optionContainer__text}>
            {t("MainPage.HowItWorks.Option2Text")}
          </div>
        </div>
      </div>
      {/* <a
        href={config.socialMediaLinks.hubspot}
        target="_blank"
        rel="noreferrer"
        className={style.navigationLink}
        onClick={() => analyticsService.createFacebookEvent("Lead", {})}
      >
        {t("MainPage.HowItWorks.Button")}
      </a> */}
      <button
        className={style.navigationLink}
        onClick={() => {
          dispatch(setIsShowMailingPopup(true));
          if (currentCar) {
            analyticsService.createFacebookEvent("AddToCart", {
              value: currentCar.priceForFacebook,
              currency: "USD",
              content_ids: currentCar.id,
              content_type: "product",
              product_catalog_id: config.facebookProductCatalogId,
            });
          } else {
            analyticsService.createFacebookEvent("Lead", {});
          }
          analyticsService.createGAEvent("begin_checkout", {});
        }}
      >
        {t("MainPage.HowItWorks.Button")}
      </button>
    </div>
  );
}

export default HowItWorks;
