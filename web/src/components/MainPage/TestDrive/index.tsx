import React from "react";
import { useTranslation } from "react-i18next";

import style from "./TestDrive.module.scss";

import config from "../../../config";
import analyticsService from "../../../service/analytics";
import { useAppDispatch } from "../../../hooks";
import { setIsShowMailingPopup } from "../../../store/slices/mailing";

function TestDrive(): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <div className={style.mainWrapper}>
      <div className={style.mainContainer}>
        <div className={style.content}>
          <div className={style.text}>{t("MainPage.TestDrive.Text")}</div>
          <div className={`${style.text} ${style.text__strong}`}>
            {t("MainPage.TestDrive.TextStrong")}
          </div>
          {/* <a
            href={config.socialMediaLinks.hubspot}
            target="_blank"
            rel="noreferrer"
            className={style.navigationLink}
            onClick={() => analyticsService.createFacebookEvent("Lead", {})}
          >
            Go Drivovo
          </a> */}
          <button
            className={style.navigationLink}
            onClick={() => {
              dispatch(setIsShowMailingPopup(true));
              analyticsService.createFacebookEvent("Lead", {});
              analyticsService.createGAEvent("begin_checkout", {});
            }}
          >
            Go Drivovo
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestDrive;
