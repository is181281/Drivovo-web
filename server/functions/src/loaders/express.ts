import express, { Application, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";

import routes from "../api";

export default ({ app }: { app: Application }): void => {
  app.use(cors());

  app.get("/status", (req: Request, res: Response) => {
    return res.sendStatus(200);
  });

  app.use(express.static("public"));

  app.use(bodyParser.json());

  app.use(routes());
};
