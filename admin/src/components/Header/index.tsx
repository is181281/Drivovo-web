import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";

import style from "./Header.module.scss";

import { headerLogo } from "../../assets/images";
import { useAppDispatch, useTypedSelector } from "../../hooks";
import firebase from "../../firebase";
import { setIsAuthorized } from "../../store/slices/auth";

function Header(): JSX.Element {
  const location = useLocation();
  const { userEmail } = useTypedSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className={style.mainWrapper} id="header">
      <div className={style.sideContainer}>
        <Link to="/" className={style.logoContainer}>
          <img src={headerLogo} className={style.logoImage} alt="header logo" />
        </Link>
        <div className={style.navigationLinksContainer}>
          <Link
            to="/"
            className={`${style.navigationLink} ${
              location.pathname === "/" ? style.navigationLink__active : ""
            }`}
          >
            {"Автопарк"}
          </Link>
          <Link
            to="/car/new"
            className={`${style.navigationLink} ${
              location.pathname === "/car/new"
                ? style.navigationLink__active
                : ""
            }`}
          >
            {"Додати авто"}
          </Link>
          <Link
            to="/faq"
            className={`${style.navigationLink} ${
              location.pathname === "/faq" ? style.navigationLink__active : ""
            }`}
          >
            {"Часті запитання"}
          </Link>
        </div>
      </div>
      <div className={style.sideContainer}>
        <div
          className={style.navigationLink}
          onClick={async () => {
            await firebase.auth().signOut();
            dispatch(setIsAuthorized(null));
          }}
        >
          {userEmail}
        </div>
      </div>
    </div>
  );
}

export default Header;
