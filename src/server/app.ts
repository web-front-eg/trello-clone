import express from "express";
import morgan from "morgan"; // development logging in specific
import bodyParser from "body-parser";
import cors from "cors"; // Allow cors
import path from "path"; // get path for static filing. -> ./dist

// import { router } from "./router/user-route";
// import errCtrl from "./controller/error-ctrl";

class App {
  private readonly app: any;
  get getApp(): any {
    return this.app;
  }

  constructor() {
    this.app = express();

    // 3. Development logging
    // process.env.NODE_ENV !== process.env.NODE_ENV?.trim() || "development";
    // if (process.env.NODE_ENV === "development") {
    // }
    this.app.use(morgan("dev"));

    // Body parser, reading data from body into req.body
    // this.app.use(express.json({ limit: "10kb" }));
    // this.app.use(express.json());

    // using deprecated bodyParser due to naver map API cdn.
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    // Allow cors
    const corsOption = {
      origin: "http://127.0.0.1:3000",
      credentials: true,
    };
    this.app.use(cors(corsOption));
    // this.app.use(cors());

    // static files
    // console.log(path.join(__dirname, "../public"));
    
    // this.app.use("/", express.static(path.join(__dirname, "../public")));
    // this.app.use(express.static("public"));

    // routers
    // this.app.use("/", router);

    // errors
    // this.app.use(errCtrl);
  }
}

export default App;
