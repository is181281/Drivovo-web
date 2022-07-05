import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HashLink as Link } from "react-router-hash-link";

import style from "./CarPage.module.scss";

import Innovation from "./Innovation";
import HowItWorks from "../MainPage/HowItWorks";
import WhatIsSubscription from "../MainPage/WhatIsSubscription";
import { Car } from "../../types";
import Banner from "../Banner";
import config from "../../config";
import { useAppDispatch, useTypedSelector } from "../../hooks";
import { getCarsList } from "../../store/thunks/cars";
import Spinner from "../Spinner";
import analyticsService from "../../service/analytics";
import { setIsShowMailingPopup } from "../../store/slices/mailing";

const economicsParamters: (keyof Car)[] = [
  // "totalPrice",
  // "firstMonthCost",
  "period",
  // "warrantyDeposit",
  "price",
  "totalFirstPayment",
  // "cost3years",
  // "lastPayment",
];

function CarPage(): JSX.Element {
  const { id } = useParams();
  const { t } = useTranslation();
  const { carsList, carsError } = useTypedSelector((state) => state.cars);
  const dispatch = useAppDispatch();

  const currentCar = carsList.find((car) => car.id === id);

  useEffect(() => {
    if (carsList.length === 0 && !carsError) {
      dispatch(getCarsList());
    }
  }, [carsError, carsList.length, dispatch]);

  useEffect(() => {
    if (currentCar) {
      analyticsService.createFacebookEvent("ViewContent", {
        content_ids: currentCar.id,
        content_type: "product",
      });
      analyticsService.createGAEvent("view_item", {
        items: [
          {
            item_id: currentCar.id,
            item_name: currentCar.model,
            price: currentCar.price,
          },
        ],
      });
    }
  }, [currentCar]);

  if (!currentCar) {
    return <Spinner />;
  }

  return (
    <div className={style.mainWrapper}>
      <div
        className={`${style.headerContainer} ${style.headerContainer__first}`}
      >
        <div className={style.headerTextContainer}>
          <span className={style.headerText}>{t("CarPage.Model")}</span>
          <span className={style.headerTextStrong}>{currentCar?.model}</span>
        </div>
        <Link to="/cars" className={style.navigationLink}>
          <div className={style.navigationLink__arrow}></div>
          <span>{t("CarPage.Link")}</span>
        </Link>
      </div>
      <div className={style.mainContainer}>
        <div className={style.sliderWrapper}>
          <img
            src={currentCar?.image}
            className={style.sliderWrapper__image}
            alt="car"
          />
        </div>
        <div className={style.sideContainer}>
          <div className={style.sideContainer__header}>
            {t("CarPage.Parameters")}
          </div>
          <div className={style.sideContainer__parameter}>
            <div className={style.sideContainer__parameter__name}>
              {t("CarCard.Acceleration")}
            </div>
            <div className={style.sideContainer__parameter__container}>
              <div className={style.sideContainer__parameter__value}>
                {currentCar?.acceleation}
              </div>
              <div className={style.sideContainer__parameter__dimension}>
                {t("CarCard.Seconds")}
              </div>
            </div>
          </div>
          <div className={style.sideContainer__parameter}>
            <div className={style.sideContainer__parameter__name}>
              {t("CarCard.Consumption")}
            </div>
            <div className={style.sideContainer__parameter__container}>
              <div className={style.sideContainer__parameter__value}>
                {currentCar?.consumption}
              </div>
              <div className={style.sideContainer__parameter__dimension}>
                {t("CarCard.L100km")}
              </div>
            </div>
          </div>
          <div className={style.sideContainer__parameter}>
            <div className={style.sideContainer__parameter__name}>
              {t("CarCard.Power")}
            </div>
            <div className={style.sideContainer__parameter__container}>
              <div className={style.sideContainer__parameter__value}>
                {currentCar?.power}
              </div>
              <div className={style.sideContainer__parameter__dimension}>
                {t("CarCard.HP")}
              </div>
            </div>
          </div>
          <div className={style.sideContainer__parameter}>
            <div className={style.sideContainer__parameter__name}>
              {t("CarCard.MaxSpeed")}
            </div>
            <div className={style.sideContainer__parameter__container}>
              <div className={style.sideContainer__parameter__value}>
                {currentCar?.maxspeed}
              </div>
              <div className={style.sideContainer__parameter__dimension}>
                {t("CarCard.KmperHour")}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${style.headerContainer} ${style.headerContainer__second}`}
      >
        <div className={style.headerTextContainer}>
          <span className={style.headerText}>{t("CarPage.Model")}</span>
          <span className={style.headerTextStrong}>{currentCar?.model}</span>
        </div>
      </div>
      <div className={style.economicsContainer}>
        {economicsParamters.map((parameter) => (
          <div
            className={style.parameter__container}
            key={`economics ${parameter}`}
          >
            <div className={style.parameter__name}>
              {t(`CarPage.Economics.${parameter}`)}
            </div>
            <div className={style.parameter__gap}></div>
            <div className={style.parameter__value}>
              {parameter === "period"
                ? `${currentCar![parameter]} ${t("CarPage.Economics.months")}`
                : `$ ${currentCar![parameter]}`}
            </div>
          </div>
        ))}
      </div>
      {/* <a
        href={config.socialMediaLinks.hubspot}
        target="_blank"
        rel="noreferrer"
        className={style.button}
        onClick={() =>
          analyticsService.createFacebookEvent("AddToCart", {
            value: currentCar.priceForFacebook,
            currency: "USD",
            content_ids: currentCar.id,
            content_type: "product",
            product_catalog_id: config.facebookProductCatalogId,
          })
        }
      >
        {t("CarPage.Button")}
      </a> */}
      <button
        className={style.button}
        onClick={() => {
          dispatch(setIsShowMailingPopup(true));
          analyticsService.createFacebookEvent("AddToCart", {
            value: currentCar.priceForFacebook,
            currency: "USD",
            content_ids: currentCar.id,
            content_type: "product",
            product_catalog_id: config.facebookProductCatalogId,
          });
          analyticsService.createGAEvent("begin_checkout", {});
        }}
      >
        {t("CarPage.Button")}
      </button>
      <WhatIsSubscription
        header="CarPage.WhatIsSubscription.Header"
        headerStrong="CarPage.WhatIsSubscription.HeaderStrong"
      />
      <Innovation image={currentCar!.imageInnovation} />
      <HowItWorks id={id} />
      <Banner />
    </div>
  );
}

export default CarPage;
