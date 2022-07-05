import React from "react";
import { useTranslation } from "react-i18next";

import style from "./Review.module.scss";

import { commas } from "../../assets/images";

type Props = {
  text: string;
  name: string;
  position: string;
  photo: string;
  link: string;
};

function Review({ text, name, position, photo, link }: Props): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={style.mainWrapper}>
      <div className={style.quoteWrapper}>
        <img className={style.quoteImage} src={commas} alt="quotes" />
        <div>
          <p className={style.textContainer}>
            {text}
            <a
              className={style.socialLink}
              href={link}
              target="_blank"
              rel="noreferrer"
            >
              {t("Reviews.More")}
            </a>
          </p>
        </div>
      </div>
      <div className={style.authorWrapper}>
        <img className={style.authorImage} src={photo} alt="author" />
        <div className={style.authorText}>
          <p className={style.authorText__name}>{name}</p>
          <p className={style.authorText__position}>{position}</p>
        </div>
      </div>
    </div>
  );
}

export default Review;
