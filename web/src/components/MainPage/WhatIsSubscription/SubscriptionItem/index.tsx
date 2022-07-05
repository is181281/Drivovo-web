import React from "react";
import { useTranslation } from "react-i18next";

import style from "./SubscriptionItem.module.scss";

type Props = {
  subscriptionIndex: number;
};

function SubscriptionItem({ subscriptionIndex }: Props): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={style.mainWrapper}>
      <div className={style.index}>{subscriptionIndex}</div>
      <div className={style.text}>
        {t(`MainPage.SubscriptionItems.Item${subscriptionIndex}`)}
      </div>
    </div>
  );
}

export default SubscriptionItem;
