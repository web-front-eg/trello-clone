import express from "express";
import morgan from "morgan"; // development logging in specific
import cors from "cors"; // Allow cors
import bodyParser from "body-parser";

import { router } from "./router/Router";

export class App {
  private readonly app: any;
  get getApp(): any {
    return this.app;
  }

  constructor() {
    this.app = express();

    // this.app.use(morgan("dev"));

    // Allow cors
    this.app.use(cors());

    // body-parser
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());

    // static files
    // console.log(path.join(__dirname, "../public"));

    // this.app.use("/", express.static(path.join(__dirname, "../public")));
    // this.app.use(express.static("public"));

    // routers
    this.app.use("/", router);
  }
}

export default App;
