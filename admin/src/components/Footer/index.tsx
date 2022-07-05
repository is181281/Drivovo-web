import React from "react";
import { HashLink as Link } from "react-router-hash-link";

import style from "./Footer.module.scss";

import { footerLogo } from "../../assets/images";

function Footer(): JSX.Element {
  return (
    <div className={style.mainWrapper} id={"footer"}>
      <div className={style.headWrapper}>
        <div className={style.headContainer}>
          <div className={style.sideContainer}>
            <img
              className={style.logoContainer}
              src={footerLogo}
              alt="header logo"
            />
          </div>
          <div className={style.navigationLinksContainer}>
            <Link to="/" className={style.navigationLink}>
              {"Автопарк"}
            </Link>
            <Link to="/car/new" className={style.navigationLink}>
              {"Додати авто"}
            </Link>
            <Link to="/faq" className={style.navigationLink}>
              {"Часті запитання"}
            </Link>
          </div>
        </div>
      </div>
      <div className={style.footWrapper}>
        <div className={style.footContainer}>
          <div
            className={`${style.footSideContainer} ${style.footSideContainer__left}`}
          >
            © 2022 Drivovo
          </div>
          <div
            className={`${style.footSideContainer} ${style.footSideContainer__right}`}
          >
            Powered by
            <div className={style.carBarLogo}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
