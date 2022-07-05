import React from "react";
import { useTranslation } from "react-i18next";
import { HashLink as Link } from "react-router-hash-link";

import style from "./SideMenu.module.scss";

import { closeIcon } from "../../../assets/icons";
import SocialLinks from "../../SocialLinks";
import i18next from "../../../internationalization";
import { Language } from "../../../types";

type Props = {
  isOpen: boolean;
  closeHandler: () => void;
};

function SideMenu({ isOpen, closeHandler }: Props): JSX.Element {
  const { t } = useTranslation();

  return (
    <div
      className={`${style.mainWrapper} ${
        isOpen ? style.mainWrapper__opened : style.mainWrapper__closed
      }`}
    >
      <div className={style.header__container}>
        <div className={style.header__text}>{t("LinkNames.Menu")}</div>
        <div className={style.languageSelectContainer}>
          <div
            className={`${style.languageSelect} ${
              i18next.language === Language.ua
                ? style.languageSelect__active
                : ""
            }`}
            onClick={() => i18next.changeLanguage(Language.ua)}
          >
            УКР
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
        <img
          className={style.header__closeButton}
          src={closeIcon}
          alt="close"
          onClick={closeHandler}
        />
      </div>
      <div className={style.mainNavigationLinksContainer}>
        <Link
          to="/"
          className={style.mainNavigationLink}
          onClick={closeHandler}
        >
          {t("LinkNames.Main")}
        </Link>
        <Link
          to="/b2b"
          className={style.mainNavigationLink}
          onClick={closeHandler}
        >
          {t("LinkNames.ForBusiness")}
        </Link>
        {/* <Link to="/" className={style.navigationLink} onClick={closeHandler}>
          {t("LinkNames.ReferralProgram")}
        </Link> */}
        <Link
          to="/faq"
          className={style.mainNavigationLink}
          onClick={closeHandler}
        >
          {t("LinkNames.FAQ")}
        </Link>
      </div>
      <div className={style.navigationLinksContainer}>
        <Link
          to="/about-us"
          className={style.navigationLink}
          onClick={closeHandler}
        >
          {t("LinkNames.AboutUs")}
        </Link>
        <Link
          to="/cars"
          className={style.navigationLink}
          onClick={closeHandler}
        >
          {t("LinkNames.ChoseCar")}
        </Link>
        <Link to="/b2b" className={style.navigationLink} onClick={closeHandler}>
          {t("LinkNames.ForBusiness")}
        </Link>
        {/* <Link to="/" className={style.navigationLink} onClick={closeHandler}>
          {t("LinkNames.ReferralProgram")}
        </Link> */}
        <Link
          to="/conditions"
          className={style.navigationLink}
          onClick={closeHandler}
        >
          {t("LinkNames.Conditions")}
        </Link>
      </div>
      <div className={style.footer}>
        <SocialLinks theme="dark" />
      </div>
    </div>
  );
}

export default SideMenu;
