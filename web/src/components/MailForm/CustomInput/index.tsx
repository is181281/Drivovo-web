import React from "react";
import { useTranslation } from "react-i18next";

import style from "./CustomInput.module.scss";

type Props = {
  id: string;
  type?: string;
  placeholder: string;
  value: string;
  error?: string | undefined;
  changeHandler: (e: React.ChangeEvent) => void;
  touched?: boolean;
  disabled?: boolean;
  backgroundColor: "white" | "grey";
};

export default function CustomInput({
  id,
  type,
  placeholder,
  value,
  changeHandler,
  error,
  touched,
  disabled,
  backgroundColor,
}: Props): JSX.Element {
  const hasError = error && touched;
  const { t } = useTranslation();

  return (
    <div className={style.wrapper}>
      <input
        id={id}
        type={type}
        value={value}
        className={
          hasError ? `${style.input} ${style.inputError}` : style.input
        }
        onChange={(e) => changeHandler(e)}
        disabled={disabled}
        placeholder=" "
      />
      <label
        htmlFor={id}
        className={`${style.text} ${style[`text__${backgroundColor}`]}`}
      >
        {placeholder}
      </label>
      <div className={hasError ? style.errorText : style.blockHidden}>
        {error && t(error)}
      </div>
    </div>
  );
}
