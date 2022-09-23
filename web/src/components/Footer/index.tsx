import React from "react";
import { useTranslation } from "react-i18next";
import { HashLink as Link } from "react-router-hash-link";

import style from "./Footer.module.scss";

import { footerLogo } from "../../assets/images";
import config from "../../config";
import SocialLinks from "../SocialLinks";
import { addLocaleToRoute } from "../../helpers/addLocaleToRoute";

function Footer(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={style.mainWrapper}>
      <div className={style.headWrapper}>
        <div className={style.headContainer}>
          <div className={style.sideContainer}>
            {/* <div className={style.logoContainer}>
              <img src={footerLogo} alt="header logo" />
            </div> */}
            <img
              className={style.logoContainer}
              src={footerLogo}
              alt="header logo"
            />
            <SocialLinks theme="dark" />
          </div>
          <div className={style.navigationLinksContainer}>
            <Link to={addLocaleToRoute('/')} className={style.navigationLink}>
              {t("LinkNames.Main")}
            </Link>
            <Link to={addLocaleToRoute('/conditions')} className={style.navigationLink}>
              {t("LinkNames.Conditions")}
            </Link>
            <Link to={addLocaleToRoute('/b2b')} className={style.navigationLink}>
              {t("LinkNames.ForBusiness")}
            </Link>
            <Link to={addLocaleToRoute('/faq')} className={style.navigationLink}>
              {t("LinkNames.FAQ")}
            </Link>
            {/* <Link to="/" className={style.navigationLink}>
              {t("LinkNames.ReferralProgram")}
            </Link> */}
            <a
              href={config.publicOfferUrl}
              target="_blank"
              rel="noreferrer"
              className={style.navigationLink}
            >
              {t("LinkNames.PublicOffer")}
            </a>
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
