import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { HashLink as Link } from "react-router-hash-link";

import style from "./FAQ.module.scss";

import { useAppDispatch, useTypedSelector } from "../../../hooks";
import Question from "../../Question";
import DrivePartners from "../DrivePartners";
import { MultiLanguageString } from "../../../types";
import { getQuestionsList } from "../../../store/thunks/questions";

function FAQ(): JSX.Element {
  const { questionsList, questionsError } = useTypedSelector(
    (state) => state.questions
  );
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (questionsList.length === 0 && !questionsError) {
      dispatch(getQuestionsList());
    }
  }, [dispatch, questionsError, questionsList.length]);

  return (
    <div className={style.mainWrapper}>
      <div className={style.mainContainer}>
        <div className={style.headerContainer}>
          <div className={style.headerTextContainer}>
            <span className={style.headerText}>{t("MainPage.FAQ.Header")}</span>
            <span className={style.headerTextStrong}>
              {t("MainPage.FAQ.HeaderStrong")}
            </span>
          </div>
          <Link
            to="/faq"
            className={`${style.navigationLink} ${style.navigationLink__top}`}
          >
            <div className={style.navigationLink__arrow}></div>
            <span>{t("MainPage.FAQ.Link")}</span>
          </Link>
        </div>
        {questionsList.length > 4 && (
          <div className={style.questionContainer}>
            {[1, 2, 3, 4, 5].map((item, index) => (
              <Question
                index={questionsList[index].priority}
                question={
                  questionsList[index].questionText[
                    i18n.language as keyof MultiLanguageString
                  ]
                }
                answer={
                  questionsList[index].answerText[
                    i18n.language as keyof MultiLanguageString
                  ]
                }
                isQuestionExpanded={index === 0 ? true : false}
                key={`faq${item}`}
              />
            ))}
          </div>
        )}
        <Link
          to="/faq"
          className={`${style.navigationLink} ${style.navigationLink__bottom}`}
        >
          <div className={style.navigationLink__arrow}></div>
          <span>{t("MainPage.FAQ.Link")}</span>
        </Link>
        <DrivePartners />
      </div>
    </div>
  );
}

export default FAQ;
