import React from "react";
import { useLocation } from "react-router-dom";

import style from "./ConfirmationPopup.module.scss";

import { useAppDispatch, useTypedSelector } from "../../../hooks";
import { setIsShowMailingConfirmationPopup } from "../../../store/slices/mailing";
import { t } from "i18next";
import { confirmationLogo } from "../../../assets/images";
import analyticsService from "../../../service/analytics";
import config from "../../../config";

function ConfirmationPopup(): JSX.Element {
  const { carsList } = useTypedSelector((state) => state.cars);
  const dispatch = useAppDispatch();
  const location = useLocation();

  return (
    <div className={style.mainWrapper}>
      <button
        className={style.closeButton}
        onClick={() => {
          if (location.pathname.includes("/car/")) {
            const id = location.pathname.replace("/car/", "");
            const currentCar = carsList.find((car) => car.id === id);
            if (currentCar) {
              analyticsService.createFacebookEvent("Purchase", {
                value: currentCar.priceForFacebook,
                currency: "USD",
                content_ids: currentCar.id,
                content_type: "product",
                product_catalog_id: config.facebookProductCatalogId,
              });
            }
          } else {
            analyticsService.createFacebookEvent("InitiateCheckout", {});
          }
          analyticsService.createGAEvent("generate_lead", {});
          dispatch(setIsShowMailingConfirmationPopup(false));
        }}
      ></button>
      <img className={style.image} alt="logo" src={confirmationLogo}></img>
      <span className={style.header}>
        {t("MailingForm.ConfirmationMessageHeader")}
      </span>
      <span className={style.text}>{t("MailingForm.ConfirmationMessage")}</span>
    </div>
  );
}

export default ConfirmationPopup;
