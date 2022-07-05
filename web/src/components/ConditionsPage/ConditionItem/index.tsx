import React from "react";
import { useTranslation } from "react-i18next";

import style from "./ConditionItem.module.scss";

type Props = {
  conditionIndex: number;
};

function ConditionItem({ conditionIndex }: Props): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={style.mainWrapper}>
      <div className={style.index}>{conditionIndex}</div>
      <div className={style.header}>
        {t(`ConditionsPage.Name${conditionIndex}`)}
      </div>
      <div className={style.text}>
        {t(`ConditionsPage.Text${conditionIndex}`)}
      </div>
    </div>
  );
}

export default ConditionItem;
