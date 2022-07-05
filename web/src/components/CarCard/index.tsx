import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import style from "./CarCard.module.scss";

type Props = {
  id: string;
  image: string;
  model: string;
  price: string;
  acceleation: string;
  consumption: string;
  power: string;
  maxspeed: string;
};

function CarCard({
  id,
  image,
  model,
  price,
  acceleation,
  consumption,
  power,
  maxspeed,
}: Props): JSX.Element {
  const { t } = useTranslation();

  return (
    <NavLink to={`/car/${id}`} className={style.mainWrapper}>
      <div className={style.sideContainer}>
        <div className={style.sideContainer__parameter__name}>
          {t("CarCard.Acceleration")}
        </div>
        <div className={style.sideContainer__parameter__value}>
          {acceleation}
        </div>
        <div className={style.sideContainer__parameter__dimension}>
          {t("CarCard.Seconds")}
        </div>
        <div className={style.sideContainer__parameter__name}>
          {t("CarCard.Consumption")}
        </div>
        <div className={style.sideContainer__parameter__value}>
          {consumption}
        </div>
        <div className={style.sideContainer__parameter__dimension}>
          {t("CarCard.L100km")}
        </div>
        <div className={style.sideContainer__parameter__name}>
          {t("CarCard.Power")}
        </div>
        <div className={style.sideContainer__parameter__value}>{power}</div>
        <div className={style.sideContainer__parameter__dimension}>
          {t("CarCard.HP")}
        </div>
        <div className={style.sideContainer__parameter__name}>
          {t("CarCard.MaxSpeed")}
        </div>
        <div className={style.sideContainer__parameter__value}>{maxspeed}</div>
        <div className={style.sideContainer__parameter__dimension}>
          {t("CarCard.KmperHour")}
        </div>
      </div>
      <img src={image} alt="car" className={style.image} />
      <div className={style.header}>{model}</div>
      <div className={style.text}>{`${t("CarCard.From")} ${price} ${t(
        "CarCard.PerMonth"
      )}`}</div>
    </NavLink>
  );
}

export default CarCard;
