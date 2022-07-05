import React, { useState } from "react";

import style from "./Question.module.scss";

import { whiteArrowDown, whiteArrowUp } from "../../assets/images";
import addHeadersToText from "../../helpers/addHeaderToText";

type Props = {
  index: number;
  question: string;
  answer: string;
  isQuestionExpanded: boolean;
};

function Question({
  index,
  question,
  answer,
  isQuestionExpanded,
}: Props): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(isQuestionExpanded);

  return (
    <div className={style.mainWrapper}>
      <div className={style.numberContainer}>{index}</div>
      <div className={style.textContainer}>
        <div className={style.textContainer__question}>{question}</div>
        {isExpanded && (
          <p className={style.textContainer__answer}>
            {addHeadersToText(answer, style.textContainer__answer__header)}
          </p>
        )}
      </div>
      <div className={style.expandContainer}>
        <button
          className={style.expandContainer__button}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <img src={isExpanded ? whiteArrowUp : whiteArrowDown} alt="arrow" />
        </button>
      </div>
    </div>
  );
}

export default Question;
