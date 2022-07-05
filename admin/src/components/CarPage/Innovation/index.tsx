/* eslint-disable max-len */
import React from "react";

import style from "./Innovation.module.scss";

import { Car } from "../../../types";
import { updateCarImage } from "../../../store/thunks/cars";
import { useAppDispatch } from "../../../hooks";

type Props = {
  currentCar: Car;
  setNewCarInnovationImageFile?: React.Dispatch<
    React.SetStateAction<File | null>
  >;
  newCarInnovationImageFile?: File | null;
};

function Innovation({
  currentCar,
  setNewCarInnovationImageFile,
  newCarInnovationImageFile,
}: Props): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className={style.mainWrapper}>
      <div className={style.textWrapper}>
        <div className={style.headerContainer}>
          <div className={style.header}>{"Інновації "}</div>
          <div className={style.headerStrong}>{"новаторів"}</div>
        </div>
        <ul className={style.textList}>
          <li className={style.textList__item}>
            {
              "Тут все спрямоване на те, щоб кожна подорож була тобі максимально комфортною. За допомогою мультифункціонального керма, наприклад, можна керувати численними функціями, не відриваючи рук від керма."
            }
          </li>
          <li className={style.textList__item}>
            {
              "Ти можеш отримати всі переваги одразу! Багато місця для пасажирів та багажу. Додай ще одну перевагу SUV – високу позашляхову посадку."
            }
          </li>
          <li className={style.textList__item}>
            {
              "Сідай, відкинься на спинку та розслабся. У салоні на тебе чекають комфортні сидіння зі шкіряною оббивкою та кольоровими акцентами, а також панорамним підйомно-зсувним дахом, що відкриває чудові перспективи для всіх пасажирів."
            }
          </li>
        </ul>
      </div>
      <div className={style.imageWrapper}>
        <label>
          <input
            className={style.uploadInput}
            id="fileUpload"
            type="file"
            name="file"
            accept="image/png, image/jpeg"
            tabIndex={-1}
            onChange={(e) => {
              if (setNewCarInnovationImageFile) {
                setNewCarInnovationImageFile(e.target.files![0]);
              } else {
                dispatch(
                  updateCarImage({
                    id: currentCar.id,
                    file: e.target.files![0],
                    mainImage: false,
                  })
                );
              }
            }}
          />
          <img
            src={
              newCarInnovationImageFile
                ? URL.createObjectURL(newCarInnovationImageFile)
                : currentCar.imageInnovation
            }
            alt="innovation"
            className={style.image}
          />
        </label>
      </div>
    </div>
  );
}

export default Innovation;
