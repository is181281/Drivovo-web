/* eslint-disable require-jsdoc */
import express from "express";
import loader from "../loaders/express";

class Api {
  private app: express.Application;

  constructor() {
    this.app = express();
    loader({ app: this.app });
  }

  public getApp(): express.Application {
    return this.app;
  }
}

const api = new Api();

export default api;
