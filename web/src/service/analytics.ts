import ReactPixel from "react-facebook-pixel";
import { firebaseAnalytics } from "../firebase";

class AnalyticsService {
  createGAEvent = (name: string, parameters: { [key: string]: any }): void => {
    firebaseAnalytics.logEvent(name, parameters);
  };

  createFacebookEvent = (
    name: string,
    parameters: { [key: string]: any }
  ): void => {
    ReactPixel.track(name, parameters);
  };
}

export default new AnalyticsService();
