import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import style from "./Benefit.module.scss";

type Props = {
  image: string;
  text: string;
};

function Benefit({ image, text }: Props): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={style.mainWrapper}>
      <img className={style.image} src={image} alt={text} />
      <div className={style.text}>{t(`MainPage.Benefits.${text}`)}</div>
    </div>
  );
}

export default Benefit;
