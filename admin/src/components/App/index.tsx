import React, { Suspense, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import style from "./App.module.scss";

import Loader from "../Loader";
import MainPage from "../MainPage";
import PrivateRoute from "../PrivateRoute";
import Spinner from "../Spinner";
import { useAppDispatch, useTypedSelector } from "../../hooks";
import { Status } from "../../types";
import CarPage from "../CarPage";
import Header from "../Header";
import PublicRoute from "../PublicRoute";
import { setIsAuthorized } from "../../store/slices/auth";
import Footer from "../Footer";
import firebase from "../../firebase";
import NewCarPage from "../NewCarPage";
import FAQPage from "../FAQPage";

const Login = React.lazy(() => import("../Login"));

function App(): JSX.Element {
  const [pageLoaded, setPageLoaded] = useState(false);
  const { carsStatus } = useTypedSelector((state) => state.cars);
  const { questionStatus } = useTypedSelector((state) => state.questions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      dispatch(setIsAuthorized(user?.email));
      setPageLoaded(true);
    });
  }, []);

  if (
    !pageLoaded ||
    carsStatus === Status.loading ||
    questionStatus === Status.loading
  ) {
    return <Spinner />;
  }

  return (
    <div className={style.app}>
      <Suspense fallback={<Loader />}>
        <div className={style.app}>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <MainPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/car/:id"
              element={
                <PrivateRoute>
                  <CarPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/car/new"
              element={
                <PrivateRoute>
                  <NewCarPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/faq"
              element={
                <PrivateRoute>
                  <FAQPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
          </Routes>
          <Footer />
        </div>
      </Suspense>
    </div>
  );
}

export default App;
