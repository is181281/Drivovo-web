import React from "react";
import { useTranslation } from "react-i18next";

import style from "./WhatIsSubscription.module.scss";

import SubscriptionItem from "./SubscriptionItem";

type Props = { header: string; headerStrong: string };

function WhatIsSubscription({ header, headerStrong }: Props): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={style.mainWrapper}>
      <div className={style.mainContainer}>
        <div className={style.headerContainer}>
          <span className={style.headerText}>{t(header)}</span>
          <span className={style.headerTextStrong}>{t(headerStrong)}</span>
        </div>
        <div className={style.textContainer}>
          {t("MainPage.WhatIsSubscription.Text")}
        </div>
        <div className={style.subscriptionItemsContainer}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((subscriptionIndex) => (
            <SubscriptionItem
              subscriptionIndex={subscriptionIndex}
              key={`subscroptionItem${subscriptionIndex}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WhatIsSubscription;
