import React, { useRef } from "react";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import { NavLink } from "react-router-dom";

import style from "./CarCard.module.scss";

import { useAppDispatch } from "../../hooks";
import { DragItem, ItemTypes } from "../../types";
import { switchCarsPriority } from "../../store/slices/cars";

type Props = {
  id: string;
  image: string;
  model: string;
  price: string;
  acceleation: string;
  consumption: string;
  power: string;
  maxspeed: string;
  priority: number;
};

function CarCard({
  id,
  image,
  model,
  price,
  acceleation,
  consumption,
  power,
  maxspeed,
  priority,
}: Props): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.car,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragPriority = item.priority;
      const hoverPriority = priority;

      // Don't replace items with themselves
      if (dragPriority === hoverPriority) {
        return;
      }

      dispatch(switchCarsPriority({ dragId: item.id, dropId: id }));
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.car,
    item: () => {
      return { id, priority };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div ref={ref}>
      <NavLink to={`/car/${id}`} className={style.mainWrapper}>
        <div className={style.sideContainer}>
          <div className={style.sideContainer__parameter__name}>{"Розгін"}</div>
          <div className={style.sideContainer__parameter__value}>
            {acceleation}
          </div>
          <div className={style.sideContainer__parameter__dimension}>
            {"сек."}
          </div>
          <div className={style.sideContainer__parameter__name}>
            {"Витрати палива"}
          </div>
          <div className={style.sideContainer__parameter__value}>
            {consumption}
          </div>
          <div className={style.sideContainer__parameter__dimension}>
            {"л/100 км"}
          </div>
          <div className={style.sideContainer__parameter__name}>
            {"Потужність"}
          </div>
          <div className={style.sideContainer__parameter__value}>{power}</div>
          <div className={style.sideContainer__parameter__dimension}>
            {"к.с."}
          </div>
          <div className={style.sideContainer__parameter__name}>
            {"Макс. швидкість"}
          </div>
          <div className={style.sideContainer__parameter__value}>
            {maxspeed}
          </div>
          <div className={style.sideContainer__parameter__dimension}>
            {"км/год"}
          </div>
        </div>
        <img src={image} alt="car" className={style.image} />
        <div className={style.header}>{model}</div>
        <div className={style.text}>{`Від $ ${price} на місяць`}</div>
      </NavLink>
    </div>
  );
}

export default CarCard;
