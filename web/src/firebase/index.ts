import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/analytics";

import config from "../config/index";

firebase.initializeApp(config.firebaseConfig);
export const firebaseAnalytics = firebase.analytics();

export default firebase;
