import React from "react";
import { useTranslation } from "react-i18next";

import style from "./Reviews.module.scss";

import reviews from "../../../data/reviews";
import Review from "../../Review";
import config from "../../../config";

function Reviews(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={style.mainWrapper}>
      <div className={style.mainContainer}>
        <div className={style.headerContainer}>
          <div className={style.headerTextContainer}>
            <span className={style.headerText}>
              {t("MainPage.Reviews.Header")}
            </span>
            <span className={style.headerTextStrong}>
              {t("MainPage.Reviews.HeaderStrong")}
            </span>
          </div>
          <a
            className={`${style.navigationLink} ${style.navigationLink__top}`}
            href={config.socialMediaLinks.facebookReviews}
            target="_blank"
            rel="noreferrer"
          >
            <div className={style.navigationLink__arrow}></div>
            <span>{t("MainPage.Reviews.Link")}</span>
          </a>
        </div>
        <div className={style.reviewsContainer}>
          {reviews.map((review) => (
            <Review
              text={t(`Reviews.Text${review.number}`)}
              name={t(`Reviews.Name${review.number}`)}
              position={t(`Reviews.Position${review.number}`)}
              photo={review.img}
              link={review.link}
              key={`review${review.number}`}
            />
          ))}
        </div>
        <a
          className={`${style.navigationLink} ${style.navigationLink__bottom}`}
          href={config.socialMediaLinks.facebookReviews}
          target="_blank"
          rel="noreferrer"
        >
          <div className={style.navigationLink__arrow}></div>
          <span>{t("MainPage.Reviews.Link")}</span>
        </a>
      </div>
    </div>
  );
}

export default Reviews;
