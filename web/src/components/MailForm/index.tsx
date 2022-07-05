import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

import style from "./MailForm.module.scss";

import { mailingCarFullscreen, mailingCarPopup } from "../../assets/images";
import { MailingSchema } from "../../validation/mailing";
import CustomInput from "./CustomInput";
import { useAppDispatch } from "../../hooks";
import {
  setIsShowMailingPopup,
  setIsShowMailingConfirmationPopup,
} from "../../store/slices/mailing";
import config from "../../config";

type Props = {
  type: "fullscreen" | "popup";
};

type formValues = {
  name: string;
  email: string;
  phone: string;
  socialLink: string;
};

function MailForm({ type }: Props): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const submitHandler = async (values: formValues): Promise<void> => {
    const headers = {
      "Content-Type": "application/json",
    };

    const data = {
      submittedAt: Date.now(),
      fields: [
        {
          objectTypeId: "0-1",
          name: "email",
          value: values.email,
        },
        {
          objectTypeId: "0-1",
          name: "firstname",
          value: values.name,
        },
        // uncomment for dev server
        // {
        //   objectTypeId: "0-1",
        //   name: "firstname",
        //   value: values.name.split(" ")[0],
        // },
        // {
        //   objectTypeId: "0-1",
        //   name: "lastname",
        //   value: values.name.split(" ")[1] || "",
        // },
        {
          objectTypeId: "0-1",
          name: "phone",
          value: values.phone,
        },
        {
          objectTypeId: "0-1",
          name: "social_link",
          value: values.socialLink,
        },
      ],
      context: {
        hutk: Cookies.get("hubspotutk"),
        pageUri: `www.drivovo.com/${location.pathname.slice(1)}`,
        pageName: location.pathname.slice(1),
      },
    };

    const body = JSON.stringify(data);

    // Use it add contact via https://legacydocs.hubspot.com/docs/methods/contacts/create_contact

    // const body = JSON.stringify({
    //   email: values.email,
    //   firstName: values.name.split(" ")[0],
    //   lastName: values.name.split(" ")[1] || "",
    //   phone: values.phone,
    // });

    // const response = await fetch(
    //   "https://us-central1-drivovo-api-test.cloudfunctions.net/api/contact/",
    //   {
    //     method: "POST",
    //     headers,
    //     body,
    //   }
    // );

    const response = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${config.hubspot.portalId}/${config.hubspot.formGuid}`,
      {
        method: "POST",
        headers,
        body,
      }
    );

    // remove after testing
    const json = await response.json();
    console.log(json);

    dispatch(setIsShowMailingConfirmationPopup(true));
    dispatch(setIsShowMailingPopup(false));
  };

  return (
    <div className={`${style.mainWrapper} ${style[`mainWrapper__${type}`]}`}>
      <button
        className={`${style.closeButton} ${style[`closeButton__${type}`]}`}
        onClick={() => dispatch(setIsShowMailingPopup(false))}
      ></button>
      <div className={style[`imageWrapper__${type}`]}>
        <img
          className={style[`image__${type}`]}
          src={type === "fullscreen" ? mailingCarFullscreen : mailingCarPopup}
          alt="car"
        />
      </div>
      <div
        className={`${style.form__container} ${
          style[`form__container__${type}`]
        }`}
      >
        <div
          className={`${style.form__headerContainer} ${
            style[`form__headerContainer__${type}`]
          }`}
        >
          <span className={style.form__header}>{t("MailingForm.Header")}</span>
          <span className={style.form__headerStrong}>
            {t("MailingForm.HeaderStrong")}
          </span>
        </div>
        <span className={`${style.form__text} ${style[`form__text__${type}`]}`}>
          {t(`MailingForm.Text__${type}`)}
        </span>
        <div
          className={`${style.formikContainer} ${
            style[`formikContainer__${type}`]
          }`}
        >
          <Formik
            initialValues={{
              name: "",
              email: "",
              phone: "",
              socialLink: "",
            }}
            onSubmit={(values) => submitHandler(values)}
            validationSchema={MailingSchema}
          >
            {({ handleSubmit, handleChange, values, errors, touched }) => {
              return (
                <div
                  className={`${style.formWrapper} ${
                    style[`formWrapper__${type}`]
                  }`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit();
                    }
                  }}
                >
                  <CustomInput
                    id="name"
                    placeholder={t("MailingForm.NamePlaceholder")}
                    value={values.name}
                    error={errors.name}
                    touched={touched.name}
                    changeHandler={handleChange("name")}
                    backgroundColor={type === "popup" ? "white" : "grey"}
                  />
                  <CustomInput
                    id="phone"
                    placeholder={t("MailingForm.PhonePlaceholder")}
                    value={values.phone}
                    error={errors.phone}
                    touched={touched.phone}
                    changeHandler={handleChange("phone")}
                    backgroundColor={type === "popup" ? "white" : "grey"}
                  />
                  <CustomInput
                    id="email"
                    placeholder={t("MailingForm.EmailPlaceholder")}
                    value={values.email}
                    error={errors.email}
                    touched={touched.email}
                    changeHandler={handleChange("email")}
                    backgroundColor={type === "popup" ? "white" : "grey"}
                  />
                  <CustomInput
                    id="socialLink"
                    placeholder={t("MailingForm.SocialLinkPlaceholder")}
                    value={values.socialLink}
                    error={errors.socialLink}
                    touched={touched.socialLink}
                    changeHandler={handleChange("socialLink")}
                    backgroundColor={type === "popup" ? "white" : "grey"}
                  />
                  <button
                    type="button"
                    className={style.button}
                    onClick={() => handleSubmit()}
                  >
                    {t("MailingForm.Button")}
                  </button>
                </div>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default MailForm;
