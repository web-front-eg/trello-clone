import App from "./app";

class Server {
  private readonly app: App = new App();

  Start() {
    const server = this.app.getApp.listen(3000, () => {
      console.log(`App is running on port 3000...`);
    });

    process.on("SIGTERM", () => {
      server.close(() => {
        console.log("Process terminated");
      });
    });
  }
}

const server = new Server();
server.Start();
