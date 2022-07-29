import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ReactPixel from "react-facebook-pixel";

import config from "../../config";
import Header from "../Header";
import Footer from "../Footer";
import MainPage from "../MainPage";
import ForBusinessPage from "../ForBusinessPage";
import FAQPage from "../FAQPage";

import style from "./App.module.scss";
import CarsPage from "../CarsPage";
import CarPage from "../CarPage";
import ConditionsPage from "../ConditionsPage";
import MailingPopupContainer from "../MailingPopupContainer";
import AboutUsPage from "../AboutUsPage";
import MediaQueryProvider from "../MediaQueryProvider";
import { useAppDispatch, useTypedSelector } from "../../hooks";
import { getCarsList } from "../../store/thunks/cars";
import { Status } from "../../types";
import Spinner from "../Spinner";
import analyticsService from "../../service/analytics";
import { getQuestionsList } from "../../store/thunks/questions";

function App(): JSX.Element {
  const { carsList, carsStatus, carsError } = useTypedSelector(
    (state) => state.cars
  );
  const { questionsList, questionsStatus, questionsError } = useTypedSelector(
    (state) => state.questions
  );
  const dispatch = useAppDispatch();
  const mouseState = { iframeMouseOver: false };

  const windowBlurHandler = () => {
    if (mouseState.iframeMouseOver) {
      analyticsService.createFacebookEvent("SubmitApplication", {});
    }
  };

  useEffect(() => {
    if (carsList.length === 0 && !carsError) {
      dispatch(getCarsList());
    }
  }, [carsError, carsList.length, dispatch]);

  useEffect(() => {
    if (questionsList.length === 0 && !questionsError) {
      dispatch(getQuestionsList());
    }
  }, [dispatch, questionsError, questionsList.length]);

  useEffect(() => {
    ReactPixel.init(config.facebookPixelId, undefined, {
      autoConfig: true,
      debug: false,
    });
  }, []);

  useEffect(() => {
    const script = document.createElement("script");

    script.src = config.hubspot.scriptSrc;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const target = document.querySelectorAll(
        "#hubspot-messages-iframe-container"
      );
      if (target.length > 0) {
        target[0].addEventListener(
          "mouseover",
          () => (mouseState.iframeMouseOver = true)
        );
        target[0].addEventListener(
          "mouseout",
          () => (mouseState.iframeMouseOver = false)
        );
        clearInterval(interval);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    window.addEventListener("blur", windowBlurHandler);
    return () => {
      window.removeEventListener("blur", windowBlurHandler);
    };
  }, []);

  if (carsStatus === Status.loading || questionsStatus === Status.loading) {
    return <Spinner />;
  }

  return (
    <MediaQueryProvider>
      <div className={style.app}>
        <Header />
        <MailingPopupContainer />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/en" element={<MainPage />} />
          <Route path="/b2b" element={<ForBusinessPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/cars" element={<CarsPage />} />
          <Route path="/car/:id" element={<CarPage />} />
          <Route path="/conditions" element={<ConditionsPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
        </Routes>
        <Footer />
      </div>
    </MediaQueryProvider>
  );
}

export default App;
