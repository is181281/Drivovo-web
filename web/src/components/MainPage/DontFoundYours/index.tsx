import React from "react";
import { useTranslation } from "react-i18next";

import style from "./DontFoundYours.module.scss";

import { useAppDispatch } from "../../../hooks";
import { setIsShowMailingPopup } from "../../../store/slices/mailing";
import config from "../../../config";
import analyticsService from "../../../service/analytics";

type Props = {
  theme: "dark" | "light";
  isOnFAQPage?: boolean;
  isOnMainPage?: boolean;
};

function DontFoundYours({
  theme,
  isOnFAQPage,
  isOnMainPage,
}: Props): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <div className={`${style.mainWrapper} ${style[`mainWrapper__${theme}`]}`}>
      <div className={style.mainContainer}>
        <div className={style.textContainer}>
          <div
            className={`${style.text} ${style[`text__${theme}`]} ${
              style.text__header
            }`}
          >
            {isOnFAQPage
              ? t("MainPage.DontFoundYours.HeaderFAQ")
              : t("MainPage.DontFoundYours.Header")}
          </div>
          <div className={`${style.text} ${style[`text__${theme}`]}`}>
            {t("MainPage.DontFoundYours.Text")}
          </div>
        </div>
        {/* {isOnMainPage ? (
          <a
            href={config.socialMediaLinks.hubspot}
            target="_blank"
            rel="noreferrer"
            className={style.button}
            onClick={() => analyticsService.createFacebookEvent("Lead", {})}
          >
            {t("MainPage.DontFoundYours.Link")}
          </a>
        ) : (
          <button
            className={style.button}
            onClick={() => dispatch(setIsShowMailingPopup(true))}
          >
            {t("MainPage.DontFoundYours.Link")}
          </button>
        )} */}
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
      </div>
    </div>
  );
}

export default DontFoundYours;
