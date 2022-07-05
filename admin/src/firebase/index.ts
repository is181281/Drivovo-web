import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

import config from "../config/index";

firebase.initializeApp(config.firebaseConfig);

firebase.firestore().settings({
  ignoreUndefinedProperties: true,
});

export default firebase;
