import React, { useEffect } from "react";

import style from "./CarsPage.module.scss";

import CarCard from "../CarCard";
import { useAppDispatch, useTypedSelector } from "../../hooks";
import { getCarsList, updateCarListPriority } from "../../store/thunks/cars";
import Spinner from "../Spinner";
import { Status } from "../../types";
import NewCarCard from "../NewCarCard";

function CarsPage(): JSX.Element {
  const {
    carsList,
    carsStatus,
    carsError,
    showSaveCarListButton,
    updateCarListPriorityStatus,
  } = useTypedSelector((state) => state.cars);
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
      {updateCarListPriorityStatus === Status.loading && <Spinner />}
      <div className={style.background}></div>
      <div className={style.mainContainer}>
        <div className={style.headerContainer}>
          <span className={style.headerText}>{"Автопарк "}</span>
          <span className={style.headerTextStrong}>{"drivovo"}</span>
        </div>
        <div className={style.textContainer}>{"Яка з них твоя?"}</div>
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
            priority={car.priority}
          />
        ))}
        <NewCarCard />
      </div>
      {showSaveCarListButton && (
        <button
          className={style.button}
          onClick={() => dispatch(updateCarListPriority(carsList))}
        >
          {"Зберегти зміни"}
        </button>
      )}
    </div>
  );
}

export default CarsPage;
