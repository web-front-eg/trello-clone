import express from "express";
// import morgan from "morgan"; // development logging in specific
import cors from "cors"; // Allow cors
import bodyParser from "body-parser";

import { router } from "./router/Router";

export class App {
  private readonly _app: any;

  get app(): any {
    return this._app;
  }

  constructor() {
    this._app = express();

    // this.app.use(morgan("dev"));

    // Allow cors by default (all urls are allowed)
    this._app.use(cors());

    // body-parser
    this._app.use(bodyParser.urlencoded({ extended: true }));
    this._app.use(bodyParser.json());

    // routers
    this._app.use("/", router);
  }
}

export default App;
