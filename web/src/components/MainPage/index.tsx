import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import style from "./MainPage.module.scss";

import Benefits from "./Benefits";
import Promo from "./Promo";
import WhatIsSubscription from "./WhatIsSubscription";
import Founder from "./Founder";
import FAQ from "./FAQ";
import Reviews from "./Reviews";
import HowItWorks from "./HowItWorks";
import TestDrive from "./TestDrive";
import DontFoundYours from "./DontFoundYours";
import WhatIsYours from "./WhatIsYours";

function MainPage(): JSX.Element {
  return (
    <div className={style.mainWrapper}>
      <Promo />
      <Benefits />
      <WhatIsSubscription
        header="MainPage.WhatIsSubscription.Header"
        headerStrong="MainPage.WhatIsSubscription.HeaderStrong"
      />
      <HowItWorks />
      <WhatIsYours />
      <DontFoundYours theme="dark" isOnMainPage />
      <TestDrive />
      <Reviews />
      <FAQ />
      <Founder />
    </div>
  );
}

export default MainPage;
