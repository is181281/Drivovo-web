import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import style from "./CarsPage.module.scss";

import CarCard from "../CarCard";
import DontFoundYours from "../MainPage/DontFoundYours";
import { useAppDispatch, useTypedSelector } from "../../hooks";
import { getCarsList } from "../../store/thunks/cars";
import Spinner from "../Spinner";
import { Status } from "../../types";

function CarsPage(): JSX.Element {
  const { t } = useTranslation();
  const { carsList, carsStatus, carsError } = useTypedSelector(
    (state) => state.cars
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (carsList.length === 0 && !carsError) {
      dispatch(getCarsList());
    }
  }, [carsError, carsList.length, dispatch]);

  if (carsStatus === Status.loading) {
    return <Spinner />;
  }

  return (
    <div className={style.mainWrapper}>
      <div className={style.background}></div>
      <div className={style.mainContainer}>
        <div className={style.headerContainer}>
          <span className={style.headerText}>{t("CarsPage.Header")}</span>
          <span className={style.headerTextStrong}>
            {t("CarsPage.HeaderStrong")}
          </span>
        </div>
        <div className={style.textContainer}>{t("CarsPage.Text")}</div>
      </div>
      <div className={style.cardsContainer}>
        {carsList.map((car, index) => (
          <CarCard
            key={`${car}${index}`}
            id={car.id}
            image={car.image}
            model={car.model}
            price={car.price}
            acceleation={car.acceleation}
            consumption={car.consumption}
            power={car.power}
            maxspeed={car.maxspeed}
          />
        ))}
      </div>
      <DontFoundYours theme="light" />
    </div>
  );
}

export default CarsPage;
