export default {
  firebaseConfig: {
    apiKey: process.env.REACT_APP_APIKEY as string,
    authDomain: process.env.REACT_APP_AUTHDOMAIN as string,
    databaseURL: process.env.REACT_APP_DATABASEURL as string,
    projectId: process.env.REACT_APP_PROJECTID as string,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET as string,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID as string,
    appId: process.env.REACT_APP_APPID as string,
    measurementId: process.env.REACT_APP_MEASUREMENTID as string,
  },
};
