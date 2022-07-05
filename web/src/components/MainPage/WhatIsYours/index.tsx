import React, { createRef } from "react";
import { useTranslation } from "react-i18next";
import { HashLink as Link } from "react-router-hash-link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import style from "./WhatIsYours.module.scss";

import CarCard from "../../CarCard";
import { useMediaQueryContext } from "../../MediaQueryProvider";
import { useTypedSelector } from "../../../hooks";

function WhatIsYours(): JSX.Element {
  const { t } = useTranslation();
  const customSlider = createRef<Slider>();
  const { isMobile, isPad } = useMediaQueryContext();
  const { carsList, carsStatus, carsError } = useTypedSelector(
    (state) => state.cars
  );

  const settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    dots: isMobile ? false : true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : isPad ? 2 : 3,
    slidesToScroll: isMobile ? 1 : isPad ? 2 : 3,
    className: style.sliderContainer,
    dotsClass: style.slickDots,
    arrows: false,
  };

  return (
    <div className={style.mainWrapper}>
      <div className={style.mainContainer}>
        <div className={style.headerContainer}>
          <div className={style.headerTextContainer}>
            <span className={style.headerText}>
              {t("MainPage.WhatIsYours.Header")}
            </span>
            <span className={style.headerTextStrong}>
              {t("MainPage.WhatIsYours.HeaderStrong")}
            </span>
          </div>
          <Link
            to="/cars"
            className={`${style.navigationLink} ${style.navigationLink__top}`}
          >
            <div className={style.navigationLink__arrow}></div>
            <span>{t("MainPage.WhatIsYours.Link")}</span>
          </Link>
        </div>
        <div className={style.text}>{t("MainPage.WhatIsYours.Text")}</div>
        <div className={style.sliderWrapper}>
          <button
            className={`${style.arrow} ${style.arrow__prev}`}
            onClick={() => customSlider.current?.slickPrev()}
          ></button>
          <Slider {...settings} ref={customSlider}>
            {carsList.map((car, index) => (
              <CarCard
                key={`${car}${index}`}
                id={car.id}
                image={car.image}
                model={car.model}
                price={car.price}
                acceleation={car.acceleation}
                consumption={car.consumption}
                power={car.power}
                maxspeed={car.maxspeed}
              />
            ))}
          </Slider>
          <button
            className={`${style.arrow} ${style.arrow__next}`}
            onClick={() => customSlider.current?.slickNext()}
          ></button>
        </div>
        <Link
          to="/cars"
          className={`${style.navigationLink} ${style.navigationLink__bottom}`}
        >
          <div className={style.navigationLink__arrow}></div>
          <span>{t("MainPage.WhatIsYours.Link")}</span>
        </Link>
      </div>
    </div>
  );
}

export default WhatIsYours;
