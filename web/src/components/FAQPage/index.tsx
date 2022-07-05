import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import style from "./FAQPage.module.scss";

import QuestionItem from "../Question";
import DontFoundYours from "../MainPage/DontFoundYours";
import { useAppDispatch, useTypedSelector } from "../../hooks";
import { MultiLanguageString, Question } from "../../types";
import { getQuestionsList } from "../../store/thunks/questions";

function FAQPage(): JSX.Element {
  const { questionsList, questionsError } = useTypedSelector(
    (state) => state.questions
  );
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([1]);
  const [currentPageQuestions, setCurrentPageQuestions] = useState<Question[]>(
    []
  );

  useEffect(() => {
    if (questionsList.length === 0 && !questionsError) {
      dispatch(getQuestionsList());
    }
  }, [dispatch, questionsError, questionsList.length]);

  useEffect(() => {
    let result: Question[] = [];
    if (questionsList.length > 0) {
      result = questionsList.slice(
        (currentPageNumber - 1) * 10,
        currentPageNumber * 10
      );
    }
    setCurrentPageQuestions(result);
  }, [currentPageNumber, questionsList]);

  useEffect(() => {
    const result = [1];
    if (questionsList.length > 10) {
      for (let i = 2; i <= Math.ceil(questionsList.length / 10); i++) {
        result.push(i);
      }
    }
    setPageNumbers(result);
  }, [questionsList]);

  return (
    <div className={style.mainWrapper}>
      <div className={style.mainContainer}>
        <div className={style.headerContainer}>
          <span className={style.headerText}>{t("FAQPage.Header")}</span>
          <span className={style.headerTextStrong}>
            {t("FAQPage.HeaderStrong")}
          </span>
        </div>
        <div className={style.textContainer}>{t("FAQPage.Text")}</div>
        <div className={style.questionContainer}>
          {currentPageQuestions.map((question, index) => (
            <QuestionItem
              index={question.priority}
              question={
                question.questionText[
                  i18n.language as keyof MultiLanguageString
                ]
              }
              answer={
                question.answerText[i18n.language as keyof MultiLanguageString]
              }
              isQuestionExpanded={index === 0 ? true : false}
              key={`faq${index}`}
            />
          ))}
        </div>
        <div className={style.paginationContainer}>
          <button
            className={`${style.paginationButton} ${style.paginationButton__prev}`}
            onClick={() => {
              if (currentPageNumber > 1) {
                setCurrentPageNumber(currentPageNumber - 1);
              }
            }}
          ></button>
          <div className={style.pageNumber__container}>
            {pageNumbers.map((number) => (
              <button
                key={`pagination button ${number}`}
                className={`${style.pageNumber__button} ${
                  currentPageNumber === number
                    ? style.pageNumber__button__current
                    : ""
                }`}
                onClick={() => setCurrentPageNumber(number)}
              >
                {number}
              </button>
            ))}
          </div>
          <button
            className={`${style.paginationButton} ${style.paginationButton__next}`}
            onClick={() => {
              if (currentPageNumber < 5) {
                setCurrentPageNumber(currentPageNumber + 1);
              }
            }}
          ></button>
        </div>
      </div>
      <DontFoundYours theme="light" isOnFAQPage />
    </div>
  );
}

export default FAQPage;
