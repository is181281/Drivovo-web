import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { HashLink as Link } from "react-router-hash-link";

import style from "./CustomSelect.module.scss";

import { magnifier } from "../../assets/images";
import { useTypedSelector } from "../../hooks";
import analyticsService from "../../service/analytics";
import { addLocaleToRoute } from "../../helpers/addLocaleToRoute";

export type SelectItemType = {
  label: string;
  value: string;
};

enum OptionsState {
  closed = "closed",
  openedUp = "openedUp",
  openedDown = "openedDown",
}

export default function CustomSelect(): JSX.Element {
  const { carsList } = useTypedSelector((state) => state.cars);
  const { t, i18n } = useTranslation();
  const [options, setOptions] = useState([
    { label: t("MainPage.Promo.SelectPlaceholder"), value: "" },
    ...carsList.map((car) => ({ label: car.model, value: car.id })),
  ]);
  const [isOpenDropdown, setIsOpenDropdown] = useState<OptionsState>(
    OptionsState.closed
  );
  const [selectedItem, setSelectedItem] = useState<SelectItemType>(options[0]);

  const selectRef = useRef<HTMLDivElement>(null);

  const calculateSelectOffsetBottom = (): number => {
    const viewportHeight = window.innerHeight;
    const selectWrapperTop = selectRef.current!.getBoundingClientRect().top;
    return viewportHeight - selectWrapperTop;
  };

  const minBottomOffset = 440;

  const handleScroll = useCallback(() => {
    if (isOpenDropdown !== OptionsState.closed) {
      if (calculateSelectOffsetBottom() > minBottomOffset) {
        setIsOpenDropdown(OptionsState.openedDown);
      } else {
        setIsOpenDropdown(OptionsState.openedUp);
      }
    }
  }, [isOpenDropdown]);

  useEffect(() => {
    setOptions([
      { label: t("MainPage.Promo.SelectPlaceholder"), value: "" },
      ...carsList.map((car) => ({ label: car.model, value: car.id })),
    ]);
    if (selectedItem.value === "") {
      setSelectedItem({
        label: t("MainPage.Promo.SelectPlaceholder"),
        value: "",
      });
    }
  }, [i18n.language]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div
      ref={selectRef}
      className={`${style.selectWrapper} ${
        isOpenDropdown === OptionsState.openedUp
          ? style.selectWrapper__openedUp
          : ""
      } ${
        isOpenDropdown === OptionsState.openedDown
          ? style.selectWrapper__openedDown
          : ""
      }`}
    >
      <div className={style.selectContainer}>
        <img src={magnifier} className={style.magnifierImage} alt="magnifier" />
        <div
          className={style.select}
          onClick={() => {
            if (isOpenDropdown === OptionsState.closed) {
              if (calculateSelectOffsetBottom() > minBottomOffset) {
                setIsOpenDropdown(OptionsState.openedDown);
              } else {
                setIsOpenDropdown(OptionsState.openedUp);
              }
            } else {
              setIsOpenDropdown(OptionsState.closed);
            }
          }}
          tabIndex={-1}
          onBlur={() => {
            setIsOpenDropdown(OptionsState.closed);
          }}
        >
          <div
            className={`${style.selectText} ${
              selectedItem.value ? style.selectText__black : ""
            }`}
          >
            {selectedItem.label}
          </div>
        </div>
        <Link
          to={addLocaleToRoute(`/car/${selectedItem.value}`)}
          className={style.selectButton}
          onClick={(e) => {
            if (!selectedItem.value) {
              e.preventDefault();
            } else {
              analyticsService.createFacebookEvent("Search", {});
              analyticsService.createGAEvent("select_content", {});
            }
          }}
        >
          {t("MainPage.Promo.SelectButton")}
        </Link>
      </div>
      {isOpenDropdown !== OptionsState.closed && (
        <ul
          className={`${style.selectOptionContainer} ${
            isOpenDropdown === OptionsState.openedUp
              ? style.selectOptionContainer__up
              : ""
          } ${
            isOpenDropdown === OptionsState.openedDown
              ? style.selectOptionContainer__down
              : ""
          }`}
        >
          {options
            .filter((item: SelectItemType) => !!item.value)
            .map((item: SelectItemType) => {
              return (
                <li
                  key={`${item.value} ${item.label}`}
                  value={item.value}
                  className={style.selectOption}
                  onMouseDown={() => {
                    setSelectedItem(item);
                    setIsOpenDropdown(OptionsState.closed);
                  }}
                >
                  {item.label}
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
}
