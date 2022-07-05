import React from "react";
import { Formik } from "formik";

import style from "./Login.module.scss";

import { promoCar } from "../../assets/images";
import CustomInput from "../CustomInput";
import { LoginSchema } from "../../validation/login";
import { login } from "../../store/thunks/auth";
import { useAppDispatch, useTypedSelector } from "../../hooks";

const Login = () => {
  const { emailError, passwordError } = useTypedSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return (
    <div className={style.mainWrapper}>
      <div className={style.sliderWrapper}>
        <div className={style.sliderWrapper__image__container}>
          <img
            className={style.sliderWrapper__image}
            alt="car"
            src={promoCar}
          />
        </div>
      </div>
      <div className={style.formWrapper}>
        <div className={style.header}>{"Перший в Україні сервіс"}</div>
        <div className={style.headerStrong}>{"авто за підпискою"}</div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => {
            dispatch(login({ email: values.email, password: values.password }));
          }}
          validationSchema={LoginSchema}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => {
            return (
              <div
                className={style.formContainer}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              >
                <CustomInput
                  id="email"
                  placeholder={"Електронна пошта"}
                  value={values.email}
                  error={errors.email || emailError}
                  touched={touched.email}
                  changeHandler={handleChange("email")}
                  backgroundColor="white"
                />
                <CustomInput
                  id="password"
                  type="password"
                  placeholder={"Пароль"}
                  value={values.password}
                  error={errors.password || passwordError}
                  touched={touched.password}
                  changeHandler={handleChange("password")}
                  backgroundColor="white"
                />

                <button
                  type="button"
                  className={style.button}
                  onClick={() => handleSubmit()}
                >
                  Увійти
                </button>
              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
