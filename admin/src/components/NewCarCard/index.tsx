import React from "react";
import { NavLink } from "react-router-dom";

import style from "./NewCarCard.module.scss";

import { newCarImage } from "../../assets/images";

function NewCarCard(): JSX.Element {
  return (
    <NavLink to={"/car/new"} className={style.mainWrapper}>
      <img src={newCarImage} alt="car" className={style.image} />
      <div className={style.header}>{"Додати"}</div>
      <div className={style.text}>{"автомобіль до каталогу"}</div>
    </NavLink>
  );
}

export default NewCarCard;
