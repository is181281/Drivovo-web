/* eslint-disable new-cap */
import { Router, Request, Response, NextFunction } from "express";
import fetch from "node-fetch";

import config from "../../config";

const route = Router();

export default (app: Router): void => {
  app.use("/contact", route);

  route.post("/", async (req: Request, res: Response, next: NextFunction) => {
    const { email, firstName, lastName, phone } = req.body;
    const headers = {
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({
      properties: [
        { property: "email", value: email },
        { property: "firstname", value: firstName },
        { property: "lastname", value: lastName },
        { property: "phone", value: phone },
      ],
    });

    try {
      const response = await fetch(`https://api.hubapi.com/contacts/v1/contact/?hapikey=${config.hubSpotApiKey}`, {
        method: "POST",
        headers,
        body,
      });
      const json = await response.json();

      if (response.ok) {
        return res.status(200).json(json);
      } else return res.status(400).json(json);
    } catch (e) {
      return res.status(500);
    }
  });
};
