import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { Formik } from "formik";

import style from "./CarPage.module.scss";

import Innovation from "./Innovation";
import { Car, Status } from "../../types";
import { useAppDispatch, useTypedSelector } from "../../hooks";
import {
  deleteCar,
  getCarsList,
  updateCarImage,
  updateCarParameters,
} from "../../store/thunks/cars";
import Spinner from "../Spinner";
import { resetDeleteCarStatus, setCurrentCar } from "../../store/slices/cars";
import { CarSchema } from "../../validation/car";

const economicsParamters: (keyof Pick<
  Car,
  "period" | "price" | "totalFirstPayment"
>)[] = ["period", "price", "totalFirstPayment"];

enum economicsParamtersNames {
  period = "Період підписки",
  price = "Вартість підписки у місяць",
  totalFirstPayment = "Перший платіж, сів і поїхав",
}

function CarPage(): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    carsList,
    carsError,
    updateCarImageStatus,
    updateCarParametersStatus,
    deleteCarStatus,
    currentCar,
  } = useTypedSelector((state) => state.cars);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (carsList.length === 0 && !carsError) {
      dispatch(getCarsList());
    }
  }, [carsError, carsList.length, dispatch]);

  useEffect(() => {
    const currentCar = carsList.find((car) => car.id === id);
    if (currentCar) {
      dispatch(setCurrentCar(currentCar));
    }
  }, [carsList, id, dispatch]);

  useEffect(() => {
    if (deleteCarStatus === Status.succeeded) {
      dispatch(resetDeleteCarStatus());
      navigate("/");
    }
  }, [deleteCarStatus, dispatch, navigate]);

  if (Object.keys(currentCar).length < 1) {
    return <Spinner />;
  }

  return (
    <div className={style.mainWrapper}>
      {(updateCarImageStatus === Status.loading ||
        updateCarParametersStatus === Status.loading ||
        deleteCarStatus === Status.loading) && <Spinner />}
      <Formik
        initialValues={{
          model: currentCar.model,
          brand: currentCar.brand,
          acceleation: currentCar.acceleation,
          consumption: currentCar.consumption,
          power: currentCar.power,
          maxspeed: currentCar.maxspeed,
          period: currentCar.period,
          price: currentCar.price,
          totalFirstPayment: currentCar.totalFirstPayment,
        }}
        onSubmit={(values) => {
          dispatch(updateCarParameters({ ...values, id: currentCar.id }));
        }}
        enableReinitialize
        validationSchema={CarSchema}
      >
        {({ handleSubmit, handleChange, values, errors }) => {
          return (
            <>
              <div
                className={`${style.headerContainer} ${style.headerContainer__first}`}
              >
                <div className={style.headerTextContainer}>
                  <span className={style.headerText}>{"Модель"}</span>
                  <input
                    size={Math.max(values.model.length, 21)}
                    className={`${style.headerTextStrong} ${
                      errors.model ? style.input__error : ""
                    }`}
                    value={values.model}
                    onChange={handleChange("model")}
                  />
                  <span
                    className={`${style.headerText} ${style.headerText__brand}`}
                  >
                    {"Бренд (для каталогу Facebook)"}
                  </span>
                  <input
                    size={Math.max(values.model.length, 21)}
                    className={`${style.headerTextStrong} ${
                      style.headerTextStrong__brand
                    } ${errors.model ? style.input__error : ""}`}
                    value={values.brand}
                    onChange={handleChange("brand")}
                  />
                </div>
                <Link to="/" className={style.navigationLink}>
                  <div className={style.navigationLink__arrow}></div>
                  <span>{"Перейти до каталогу"}</span>
                </Link>
              </div>
              <div className={style.mainContainer}>
                <div className={style.sliderWrapper}>
                  <label>
                    <input
                      className={style.uploadInput}
                      id="fileUpload"
                      type="file"
                      name="file"
                      accept="image/png, image/jpeg"
                      tabIndex={-1}
                      onChange={(e) => {
                        if (id) {
                          dispatch(
                            updateCarImage({
                              id,
                              file: e.target.files![0],
                              mainImage: true,
                            })
                          );
                        }
                      }}
                    />
                    <img
                      src={currentCar.image}
                      className={style.sliderWrapper__image}
                      alt="car"
                      key={"main image"}
                    />
                  </label>
                </div>
                <div className={style.sideContainer}>
                  <div className={style.sideContainer__header}>
                    {"Характеристики"}
                  </div>
                  <div className={style.sideContainer__parameter}>
                    <div className={style.sideContainer__parameter__name}>
                      {"Розгін"}
                    </div>
                    <div className={style.sideContainer__parameter__container}>
                      <input
                        className={`${style.sideContainer__parameter__value} ${
                          errors.acceleation ? style.input__error : ""
                        }`}
                        value={values.acceleation}
                        onChange={handleChange("acceleation")}
                      />
                      <div
                        className={style.sideContainer__parameter__dimension}
                      >
                        {"сек."}
                      </div>
                    </div>
                  </div>
                  <div className={style.sideContainer__parameter}>
                    <div className={style.sideContainer__parameter__name}>
                      {"Витрати палива"}
                    </div>
                    <div className={style.sideContainer__parameter__container}>
                      <input
                        className={`${style.sideContainer__parameter__value} ${
                          errors.consumption ? style.input__error : ""
                        }`}
                        value={values.consumption}
                        onChange={handleChange("consumption")}
                      />
                      <div
                        className={style.sideContainer__parameter__dimension}
                      >
                        {"л/100 км"}
                      </div>
                    </div>
                  </div>
                  <div className={style.sideContainer__parameter}>
                    <div className={style.sideContainer__parameter__name}>
                      {"Потужність"}
                    </div>
                    <div className={style.sideContainer__parameter__container}>
                      <input
                        className={`${style.sideContainer__parameter__value} ${
                          errors.power ? style.input__error : ""
                        }`}
                        value={values.power}
                        onChange={handleChange("power")}
                      />
                      <div
                        className={style.sideContainer__parameter__dimension}
                      >
                        {"к.с."}
                      </div>
                    </div>
                  </div>
                  <div className={style.sideContainer__parameter}>
                    <div className={style.sideContainer__parameter__name}>
                      {"Макс. швидкість"}
                    </div>
                    <div className={style.sideContainer__parameter__container}>
                      <input
                        className={`${style.sideContainer__parameter__value} ${
                          errors.maxspeed ? style.input__error : ""
                        }`}
                        value={values.maxspeed}
                        onChange={handleChange("maxspeed")}
                      />
                      <div
                        className={style.sideContainer__parameter__dimension}
                      >
                        {"км/год"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`${style.headerContainer} ${style.headerContainer__second}`}
              >
                <div className={style.headerTextContainer}>
                  <span className={style.headerText}>{"Модель"}</span>
                  <input
                    size={Math.max(values.model.length, 21)}
                    className={`${style.headerTextStrong} ${
                      errors.model ? style.input__error : ""
                    }`}
                    value={values.model}
                    onChange={handleChange("model")}
                  />
                </div>
              </div>
              <div className={style.economicsContainer}>
                {economicsParamters.map((parameter) => (
                  <div
                    className={style.parameter__container}
                    key={`economics ${parameter}`}
                  >
                    <div className={style.parameter__name}>
                      {economicsParamtersNames[parameter]}
                    </div>
                    <div className={style.parameter__gap}></div>
                    <div className={style.parameter__value}>
                      {parameter === "period" ? (
                        <>
                          <input
                            className={`${style.parameter__value__month} ${
                              style.parameter__value
                            } ${errors[parameter] ? style.input__error : ""}`}
                            value={values[parameter]}
                            onChange={handleChange(parameter)}
                          />
                          {" місяців"}
                        </>
                      ) : (
                        <>
                          {"$ "}
                          <input
                            className={`${style.parameter__value__price} ${
                              style.parameter__value
                            } ${errors[parameter] ? style.input__error : ""}`}
                            value={values[parameter]}
                            onChange={handleChange(parameter)}
                          />
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button
                className={style.button}
                onClick={() => handleSubmit()}
                type="submit"
              >
                {"Зберегти зміни"}
              </button>
            </>
          );
        }}
      </Formik>
      <Innovation currentCar={currentCar} />
      <button
        className={`${style.button} ${style.button__delete}`}
        onClick={() => dispatch(deleteCar(currentCar.id))}
      >
        {"Видалити авто"}
      </button>
    </div>
  );
}

export default CarPage;
