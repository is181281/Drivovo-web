import React, { useEffect } from "react";

import style from "./MailingPopupContainer.module.scss";

import MailForm from "../MailForm";
import { useTypedSelector } from "../../hooks";
import ConfirmationPopup from "../MailForm/ConfirmationPopup";

function MailingPopupContainer(): JSX.Element {
  const { isShowMailingPopup, isShowMailingConfirmationPopup } =
    useTypedSelector((state) => state.mailing);

  return (
    <div
      className={`${style.mainWrapper} ${
        isShowMailingPopup || isShowMailingConfirmationPopup
          ? ""
          : style.invisible
      } `}
    >
      {isShowMailingPopup && <MailForm type={"popup"} />}
      {isShowMailingConfirmationPopup && <ConfirmationPopup />}
    </div>
  );
}

export default MailingPopupContainer;
