import React from "react";
import { useTranslation } from "react-i18next";

import style from "./AboutUsPage.module.scss";

import {
  commas,
  founder,
  panda1,
  panda2,
  panda3,
  panda4,
  value1,
  value2,
  value3,
  value4,
} from "../../assets/images";
import Reviews from "../MainPage/Reviews";
import config from "../../config";
import { setIsShowMailingPopup } from "../../store/slices/mailing";
import { useAppDispatch } from "../../hooks";
import analyticsService from "../../service/analytics";

function AboutUsPage(): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <div className={style.mainWrapper}>
      <div className={style.mainContainer}>
        <div className={style.headerContainer}>
          <span className={style.headerText}>{t("AboutUsPage.Header")}</span>
          <span className={style.headerTextStrong}>
            {t("AboutUsPage.HeaderStrong")}
          </span>
        </div>
        <div className={style.values__wrapper}>
          <div className={style.values__square}>
            <div className={style.values__odd}>
              <div
                className={`${style.values__container} ${style.values__container__left}`}
              >
                <img
                  className={style.values__image__panda}
                  src={panda1}
                  alt="panda"
                />
                <span className={style.values__header}>
                  {t("AboutUsPage.Values.Name1")}
                </span>
                <span className={style.values__text}>
                  {t("AboutUsPage.Values.Text1")}
                </span>
              </div>
              <img className={style.values__image} src={value1} alt="value" />
            </div>
            <div className={style.values__even}>
              <img className={style.values__image} src={value3} alt="value" />
              <div
                className={`${style.values__container} ${style.values__container__right}`}
              >
                <img
                  className={style.values__image__panda}
                  src={panda3}
                  alt="panda"
                />
                <span className={style.values__header}>
                  {t("AboutUsPage.Values.Name3")}
                </span>
                <span className={style.values__text}>
                  {t("AboutUsPage.Values.Text3")}
                </span>
              </div>
            </div>
          </div>
          <div className={style.values__square}>
            <div className={style.values__odd}>
              <div
                className={`${style.values__container} ${style.values__container__left}`}
              >
                <img
                  className={style.values__image__panda}
                  src={panda2}
                  alt="panda"
                />
                <span className={style.values__header}>
                  {t("AboutUsPage.Values.Name2")}
                </span>
                <span className={style.values__text}>
                  {t("AboutUsPage.Values.Text2")}
                </span>
              </div>
              <img className={style.values__image} src={value2} alt="value" />
            </div>
            <div className={style.values__even}>
              <img className={style.values__image} src={value4} alt="value" />
              <div
                className={`${style.values__container} ${style.values__container__right}`}
              >
                <img
                  className={style.values__image__panda}
                  src={panda4}
                  alt="panda"
                />
                <span className={style.values__header}>
                  {t("AboutUsPage.Values.Name4")}
                </span>
                <span className={style.values__text}>
                  {t("AboutUsPage.Values.Text4")}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* <a
          href={config.socialMediaLinks.hubspot}
          target="_blank"
          rel="noreferrer"
          className={style.button}
        >
          {t("AboutUsPage.Button")}
        </a> */}
        <button
          className={style.button}
          onClick={() => {
            dispatch(setIsShowMailingPopup(true));
            analyticsService.createFacebookEvent("Lead", {});
            analyticsService.createGAEvent("begin_checkout", {});
          }}
        >
          {t("MainPage.DontFoundYours.Link")}
        </button>
        <div className={style.founder__wrapper}>
          <img className={style.founder__image} src={founder} alt="founder" />
          <div className={style.founder__container}>
            <div className={style.headerContainer}>
              <span className={style.headerText}>
                {t("AboutUsPage.Founder.Header")}
              </span>
              <span className={style.headerTextStrong}>
                {t("AboutUsPage.Founder.HeaderStrong")}
              </span>
            </div>
            <span className={style.founder__position}>
              {t("MainPage.Founder.Position")}
            </span>
            <div className={style.founder__quote__container}>
              <img
                className={style.founder__image__quote}
                src={commas}
                alt="quote"
              />
              <p className={style.founder__quote__text}>
                {t("MainPage.Founder.Quote")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Reviews />
    </div>
  );
}

export default AboutUsPage;
