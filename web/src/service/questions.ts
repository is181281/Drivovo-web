import firebase from "../firebase";
import { Question } from "../types";

class QuestionsService {
  questions: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;

  constructor() {
    this.questions = firebase.firestore().collection("Questions");
  }

  async fetchQuestionsList(): Promise<Question[]> {
    const snapshot = await this.questions.orderBy("priority", "asc").get();
    const result = snapshot.docs.map((doc) => doc.data());
    return result as Question[];
  }
}

export default new QuestionsService();
