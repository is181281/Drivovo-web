import firebase from "../firebase";

import { Question } from "../types";

class QuestionService {
  questions: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;

  constructor() {
    this.questions = firebase.firestore().collection("Questions");
  }

  async fetchQuestionsList(): Promise<Question[]> {
    const snapshot = await this.questions.orderBy("priority", "asc").get();
    const result = snapshot.docs.map((doc) => doc.data());
    return result as Question[];
  }

  async createNewQuestion(
    createParameters: Omit<Question, "id">
  ): Promise<Question> {
    const newQuestionId = this.questions.doc().id;
    await this.questions
      .doc(newQuestionId)
      .set({ ...createParameters, id: newQuestionId });

    const newQuestion = await this.questions
      .where("id", "==", newQuestionId)
      .get();
    const result = newQuestion.docs[0].data() as Question;

    return result;
  }

  async updateQuestion(updateParameters: Question): Promise<Question> {
    await this.questions
      .doc(updateParameters.id)
      .update({ ...updateParameters });

    const updatedCar = await this.questions
      .where("id", "==", updateParameters.id)
      .get();

    const result = updatedCar.docs[0].data() as Question;

    return result;
  }

  async deleteQuestion(id: string): Promise<void> {
    const question = await this.questions.where("id", "==", id).get();
    if (!question) {
      throw new Error(`Питання з id=${id} не знайдено`);
    }

    const batch = firebase.firestore().batch();

    question.forEach((doc) => batch.delete(doc.ref));

    await batch.commit();
  }

  async updateQuestionListPriority(
    questionList: Question[]
  ): Promise<Question[]> {
    await Promise.all(
      questionList.map((question) =>
        this.questions.doc(question.id).update({
          priority: question.priority,
        })
      )
    );

    const updatedQuestionList = await this.fetchQuestionsList();

    return updatedQuestionList;
  }
}

export default new QuestionService();
