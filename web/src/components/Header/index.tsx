import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";

import style from "./Header.module.scss";

import { headerLogo, sideMenuDots } from "../../assets/images";
import i18next from "../../internationalization";
import { Language } from "../../types";
import SideMenu from "./SideMenu";
import SocialLinks from "../SocialLinks";

function Header(): JSX.Element {
  const { t } = useTranslation();
  const location = useLocation();
  const [isSudeMenuOpen, setIsSudeMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className={style.mainWrapper} id="header">
      <SideMenu
        isOpen={isSudeMenuOpen}
        closeHandler={() => setIsSudeMenuOpen(false)}
      />
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
            {t("LinkNames.Main")}
          </Link>
          <Link
            to="/b2b"
            className={`${style.navigationLink} ${
              location.pathname === "/b2b" ? style.navigationLink__active : ""
            }`}
          >
            {t("LinkNames.ForBusiness")}
          </Link>
          <Link
            to="/faq"
            className={`${style.navigationLink} ${
              location.pathname === "/faq" ? style.navigationLink__active : ""
            }`}
          >
            {t("LinkNames.FAQ")}
          </Link>
        </div>
      </div>
      <div className={style.sideContainer}>
        <div className={style.socialLinksContainer}>
          <SocialLinks theme="light" />
        </div>
        <div className={style.languageSelectContainer}>
          <div
            className={`${style.languageSelect} ${
              i18next.language === Language.ua
                ? style.languageSelect__active
                : ""
            }`}
            onClick={() => i18next.changeLanguage(Language.ua)}
          >
            ??????
          </div>
          <div
            className={`${style.languageSelect} ${
              i18next.language === Language.en
                ? style.languageSelect__active
                : ""
            }`}
            onClick={() => i18next.changeLanguage(Language.en)}
          >
            EN
          </div>
        </div>
        <div className={style.burgerMenu__container}>
          <img
            className={style.burgerMenu__image}
            alt="black dots"
            src={sideMenuDots}
            onClick={() => setIsSudeMenuOpen(true)}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
