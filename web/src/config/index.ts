const config = {
  firebaseConfig: {
    apiKey: process.env.REACT_APP_APIKEY as string,
    authDomain: process.env.REACT_APP_AUTHDOMAIN as string,
    projectId: process.env.REACT_APP_PROJECTID as string,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET as string,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID as string,
    appId: process.env.REACT_APP_APPID as string,
    measurementId: process.env.REACT_APP_MEASUREMENTID as string,
  },
  baseUrl: process.env.REACT_APP_BASE_URL as string,
  appEnvironment: process.env.REACT_APP_ENVIRONMENT as string,
  facebookPixelId: process.env.REACT_APP_FACEBOOK_PIXEL_ID as string,
  facebookProductCatalogId: "4441802169257211",
  socialMediaLinks: {
    facebook: "https://www.facebook.com/DrivovoClub",
    facebookReviews: "https://www.facebook.com/DrivovoClub/reviews/",
    telegram: "https://t.me/DrivovoClub",
    instagram: "https://www.instagram.com/drivovoofficial/",
    linkedIn: "https://www.linkedin.com/company/drivovo/",
    hubspot: process.env.REACT_APP_HUBSPOT_MEETING_SRC as string,
  },
  hubspot: {
    scriptSrc: process.env.REACT_APP_HUBSPOT_SCRIPT_SRC as string,
    portalId: process.env.REACT_APP_HUBSPOT_PORTAL_ID as string,
    formGuid: process.env.REACT_APP_HUBSPOT_FORM_GUID as string,
  },
  publicOfferUrl:
    "https://docs.google.com/document/d/1Vi91ZHIdagLwXUs-VTrihjfUCe6IezGM/edit",
  propositionUrl:
    "https://drive.google.com/file/d/1xPHU_dIqD0yelaV_N1VEkerkLFwmmffl/view",
};

export default config;
