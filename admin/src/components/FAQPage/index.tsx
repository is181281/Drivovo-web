import React, { useState, useEffect } from "react";

import style from "./FAQPage.module.scss";

import QuestionCard from "../Question";
import { useAppDispatch, useTypedSelector } from "../../hooks";
import {
  getQuestionsList,
  updateQuestionListPriority,
} from "../../store/thunks/questions";
import { Status } from "../../types";
import Spinner from "../Spinner";

const newQuestion = {
  id: "newquestion",
  questionText: {
    ua: "Створити нове запитання",
    en: "Create new question",
  },
  answerText: {
    ua: "Відповідь на нове запитання",
    en: "Answer to new question",
  },
};

function FAQPage(): JSX.Element {
  const {
    questionList,
    questionError,
    createNewQuestionStatus,
    updateQuestionStatus,
    deleteQuestionStatus,
    updateQuestionListPriorityStatus,
    showSaveQuestionListButton,
  } = useTypedSelector((state) => state.questions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (questionList.length === 0 && !questionError) {
      dispatch(getQuestionsList());
    }
  }, [dispatch, questionError, questionList.length]);

  return (
    <div className={style.mainWrapper}>
      {(createNewQuestionStatus === Status.loading ||
        updateQuestionStatus === Status.loading ||
        deleteQuestionStatus === Status.loading ||
        updateQuestionListPriorityStatus === Status.loading) && <Spinner />}
      <div className={style.mainContainer}>
        <div className={style.headerContainer}>
          <span className={style.headerText}>{"Часті "}</span>
          <span className={style.headerTextStrong}>{"запитання"}</span>
        </div>
        <div className={style.textContainer}>
          {
            "Скористайтесь пошуком або знайдіть питання що вас цікавить зі списку"
          }
        </div>
        <div className={style.questionContainer}>
          {questionList.map((question) => (
            <QuestionCard currentQuestion={question} key={question.id} />
          ))}
          <QuestionCard
            currentQuestion={{
              ...newQuestion,
              priority: questionList.length + 1,
            }}
            isNew
          />
        </div>
      </div>
      {showSaveQuestionListButton && (
        <button
          className={style.button}
          onClick={() => dispatch(updateQuestionListPriority(questionList))}
        >
          {"Зберегти зміни"}
        </button>
      )}
    </div>
  );
}

export default FAQPage;
