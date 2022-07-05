import React from "react";
import { useTranslation } from "react-i18next";

import style from "./ConditionsPage.module.scss";

import Banner from "../Banner";
import ConditionItem from "./ConditionItem";
import config from "../../config";
import analyticsService from "../../service/analytics";
import { useAppDispatch } from "../../hooks";
import { setIsShowMailingPopup } from "../../store/slices/mailing";

function ConditionsPage(): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <div className={style.mainWrapper}>
      <div className={style.mainContainer}>
        <div className={style.headerContainer}>
          <span className={style.headerText}>{t("ConditionsPage.Header")}</span>
          <span className={style.headerTextStrong}>
            {t("ConditionsPage.HeaderStrong")}
          </span>
        </div>
        <div className={style.conditionsContainer}>
          {[1, 2, 3, 4, 5, 6].map((conditionIndex) => (
            <ConditionItem
              conditionIndex={conditionIndex}
              key={`subscroptionItem${conditionIndex}`}
            />
          ))}
        </div>
        {/* <a
          href={config.socialMediaLinks.hubspot}
          target="_blank"
          rel="noreferrer"
          className={style.button}
          onClick={() => analyticsService.createFacebookEvent("Lead", {})}
        >
          {t("ConditionsPage.Button")}
        </a> */}
        <button
          className={style.button}
          onClick={() => {
            dispatch(setIsShowMailingPopup(true));
            analyticsService.createFacebookEvent("Lead", {});
            analyticsService.createGAEvent("begin_checkout", {});
          }}
        >
          {t("ConditionsPage.Button")}
        </button>
        <Banner />
      </div>
    </div>
  );
}

export default ConditionsPage;
