import {
  handleUncaughtExpt,
  handleUnhandledRejection,
} from "./controller/ErrorControl";

handleUncaughtExpt();

import { App } from "./App";

class Server {
  private readonly app: App = new App();
  public static PORT_NUM: number = 8080;

  public Start() {
    // start server
    const server = this.app.app.listen(Server.PORT_NUM, () => {
      console.log(
        `App is running on port ${Server.PORT_NUM}... -> http://localhost.com:${Server.PORT_NUM}`
      );
    });

    // error catch
    handleUnhandledRejection(server);

    // closing server on closing node process
    process.on("SIGTERM", () => {
      server.close(() => {
        console.log("Process terminated");
      });
    });
  }
}

// entry point
new Server().Start();
