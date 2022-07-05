/* eslint-disable new-cap */
import { Router } from "express";
import contact from "./routes/contact";

const api = (): Router => {
  const app = Router();
  contact(app);

  return app;
};

export default api;
