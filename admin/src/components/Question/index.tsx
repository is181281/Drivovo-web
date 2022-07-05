import React, { useEffect, useState, useRef } from "react";
import { Formik } from "formik";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";

import style from "./Question.module.scss";

import { whiteArrowDown, whiteArrowUp } from "../../assets/images";
import addHeadersToText from "../../helpers/addHeaderToText";
import { Question, DragItem, ItemTypes } from "../../types";
import {
  createNewQuestion,
  deleteQuestion,
  updateQuestion,
} from "../../store/thunks/questions";
import { useAppDispatch, useWindowDimensions } from "../../hooks";
import { switchQuestionsPriority } from "../../store/slices/questions";

type Props = {
  currentQuestion: Question;
  isNew?: boolean;
};

const calculateRows = (value: string, width: number) => {
  const lines = value.split("\n");
  const linesInRows = lines.map((line) => Math.ceil((line.length * 8) / width));
  return linesInRows.reduce((acc, row) => acc + row) + 1;
};

function QuestionCard({ currentQuestion, isNew }: Props): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [textAreaWidth, setTextAreaWidth] = useState(1050);
  const dispatch = useAppDispatch();

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width > 1360) {
      setTextAreaWidth(1050);
    } else if (width > 767) {
      setTextAreaWidth(650);
    } else {
      setTextAreaWidth(245);
    }
  }, [width]);

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.question,
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
      const hoverPriority = currentQuestion.priority;

      // Don't replace items with themselves
      if (dragPriority === hoverPriority) {
        return;
      }

      dispatch(
        switchQuestionsPriority({ dragId: item.id, dropId: currentQuestion.id })
      );
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.question,
    item: () => {
      return { id: currentQuestion.id, priority: currentQuestion.priority };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div className={style.mainWrapper} ref={ref}>
      <Formik
        initialValues={{
          id: currentQuestion.id,
          questionUA: currentQuestion.questionText.ua,
          questionEN: currentQuestion.questionText.en,
          answerUA: currentQuestion.answerText.ua,
          answerEN: currentQuestion.answerText.en,
        }}
        onSubmit={async (values, { resetForm }) => {
          if (isNew) {
            await dispatch(
              createNewQuestion({
                priority: currentQuestion.priority,
                questionText: { en: values.questionEN, ua: values.questionUA },
                answerText: { ua: values.answerUA, en: values.answerEN },
              })
            );
            resetForm();
          } else {
            await dispatch(
              updateQuestion({
                id: values.id,
                priority: currentQuestion.priority,
                questionText: { en: values.questionEN, ua: values.questionUA },
                answerText: { ua: values.answerUA, en: values.answerEN },
              })
            );
          }
        }}
        enableReinitialize
        // validationSchema={CarSchema}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => {
          return (
            <>
              <div className={style.numberContainer}>
                {currentQuestion.priority}
              </div>
              <div className={style.textContainer}>
                <textarea
                  className={style.textContainer__question}
                  value={values.questionUA}
                  onChange={handleChange("questionUA")}
                  rows={calculateRows(values.questionUA, textAreaWidth)}
                />
                {isExpanded && (
                  <>
                    <textarea
                      className={style.textContainer__answer}
                      value={values.answerUA}
                      onChange={handleChange("answerUA")}
                      rows={calculateRows(values.answerUA, textAreaWidth)}
                    />
                    <textarea
                      className={style.textContainer__question}
                      value={values.questionEN}
                      onChange={handleChange("questionEN")}
                      rows={calculateRows(values.questionEN, textAreaWidth)}
                    />
                    <textarea
                      className={style.textContainer__answer}
                      value={values.answerEN}
                      onChange={handleChange("answerEN")}
                      rows={calculateRows(values.answerEN, textAreaWidth)}
                    />
                    <button
                      className={style.button}
                      onClick={() => handleSubmit()}
                      type="submit"
                    >
                      {isNew ? "Додати питання" : "Зберегти зміни"}
                    </button>
                    {!isNew && (
                      <button
                        className={`${style.button} ${style.button__delete}`}
                        onClick={() => dispatch(deleteQuestion(values.id))}
                      >
                        {"Видалити питання"}
                      </button>
                    )}
                  </>
                )}
              </div>
            </>
          );
        }}
      </Formik>
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

export default QuestionCard;
