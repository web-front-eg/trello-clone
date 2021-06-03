import http from "http";

export function handleUncaughtExpt() {
  process.on("uncaughtException", (err: Error) => {
    console.log("Uncaught exception has occurred! 💩💩");
    console.error(err.name, err.message, err.stack);
    process.exit(1);
  });
}

export function handleUnhandledRejection(serv: http.Server) {
  process.on("uncaughtException", (err: Error) => {
    console.log("Unhandled rejection occurred! 💩💩");
    console.error(err.name, err.message, err.stack);
    serv.close(() => process.exit(1));
  });
}
