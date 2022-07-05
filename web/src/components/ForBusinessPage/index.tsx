import React from "react";
import { useTranslation } from "react-i18next";
import { HashLink as Link } from "react-router-hash-link";

import style from "./ForBusinessPage.module.scss";

import { preference1, preference2, preference3 } from "../../assets/images";
import MailForm from "../MailForm";
import config from "../../config";
import analyticsService from "../../service/analytics";

function ForBusinessPage(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={style.mainWrapper}>
      <div className={style.mainContainer}>
        <div className={style.headerContainer}>
          <span className={style.headerText}>
            {t("ForBusinessPage.Header")}
          </span>
          <span className={style.headerTextStrong}>
            {t("ForBusinessPage.HeaderStrong")}
          </span>
        </div>
        <div className={style.textContainer}>{t("ForBusinessPage.Text")}</div>
        <div className={style.preference__wrapper}>
          <div className={style.preference__odd}>
            <img
              className={style.preference__image}
              src={preference1}
              alt="preference"
            />
            <div
              className={`${style.preference__container} ${style.preference__container__right}`}
            >
              <span className={style.preference__header}>
                {t("ForBusinessPage.Preferences.Name1")}
              </span>
              <span className={style.preference__text}>
                {t("ForBusinessPage.Preferences.Text1")}
              </span>
            </div>
          </div>
          <div className={style.preference__even}>
            <div
              className={`${style.preference__container} ${style.preference__container__left}`}
            >
              <span className={style.preference__header}>
                {t("ForBusinessPage.Preferences.Name2")}
              </span>
              <span className={style.preference__text}>
                {t("ForBusinessPage.Preferences.Text2")}
              </span>
            </div>
            <img
              className={style.preference__image}
              src={preference2}
              alt="preference"
            />
          </div>
          <div className={style.preference__odd}>
            <img
              className={style.preference__image}
              src={preference3}
              alt="preference"
            />
            <div
              className={`${style.preference__container} ${style.preference__container__right}`}
            >
              <span className={style.preference__header}>
                {t("ForBusinessPage.Preferences.Name3")}
              </span>
              <span className={style.preference__text}>
                {t("ForBusinessPage.Preferences.Text3")}
              </span>
            </div>
          </div>
        </div>
        {/* <Link to="/" className={style.button}>
          {t("ForBusinessPage.Button")}
        </Link> */}
        <a
          href={config.propositionUrl}
          target="_blank"
          rel="noreferrer"
          className={style.button}
          onClick={() => {
            analyticsService.createFacebookEvent("Schedule", {});
            analyticsService.createGAEvent("view_promotion", {});
          }}
        >
          {t("ForBusinessPage.Button")}
        </a>
      </div>
      <MailForm type="fullscreen" />
    </div>
  );
}

export default ForBusinessPage;
