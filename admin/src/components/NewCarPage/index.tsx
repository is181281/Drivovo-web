import React, { useEffect, useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { Formik } from "formik";

import style from "./NewCarPage.module.scss";

import Innovation from "../CarPage/Innovation";
import { Car, Status } from "../../types";
import { useAppDispatch, useTypedSelector } from "../../hooks";
import { createNewCar } from "../../store/thunks/cars";
import { useNavigate } from "react-router-dom";
import { resetCreateNewCarStatus } from "../../store/slices/cars";
import { CarSchema } from "../../validation/car";
import Spinner from "../Spinner";

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
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [innovationImageFile, setInnovationImageFile] = useState<File | null>(
    null
  );
  const { newCar, createNewCarStatus } = useTypedSelector(
    (state) => state.cars
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (createNewCarStatus === Status.succeeded) {
      dispatch(resetCreateNewCarStatus());
      navigate("/");
    }
  }, [createNewCarStatus, dispatch, navigate]);

  return (
    <div className={style.mainWrapper}>
      {createNewCarStatus === Status.loading && <Spinner />}
      <Formik
        initialValues={{
          model: newCar.model,
          brand: newCar.brand,
          acceleation: newCar.acceleation,
          consumption: newCar.consumption,
          power: newCar.power,
          maxspeed: newCar.maxspeed,
          period: newCar.period,
          price: newCar.price,
          totalFirstPayment: newCar.totalFirstPayment,
        }}
        onSubmit={(values) => {
          dispatch(
            createNewCar({
              carParameters: {
                ...values,
                id: values.model
                  .replace(" ", "")
                  .replace("-", "")
                  .toLowerCase(),
                image: newCar.image,
                imageInnovation: newCar.imageInnovation,
              },
              imageFile,
              innovationImageFile,
            })
          );
        }}
        enableReinitialize
        validationSchema={CarSchema}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => {
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
                        setImageFile(e.target.files![0]);
                      }}
                    />
                    <img
                      src={
                        imageFile
                          ? URL.createObjectURL(imageFile)
                          : newCar.image
                      }
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
                {"Додати авто"}
              </button>
            </>
          );
        }}
      </Formik>
      <Innovation
        currentCar={newCar}
        setNewCarInnovationImageFile={setInnovationImageFile}
        newCarInnovationImageFile={innovationImageFile}
      />
    </div>
  );
}

export default CarPage;
