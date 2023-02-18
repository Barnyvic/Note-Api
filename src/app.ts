import express, { Request, Response } from "express";
import errorMiddleware from "./middleware/errorMiddleware";
import AuthRouter from "./routes/authRoute";
import NoteRouter from "./routes/noteRoute";

class App {
  public server;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.initializeErrorhandler();
    this.catchRouteNotFoundHandler();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use("/api/v1/auth", AuthRouter);
    this.server.use("/api/v1/note", NoteRouter);
  }

  private initializeErrorhandler() {
    this.server.use(errorMiddleware);
  }

  catchRouteNotFoundHandler() {
    this.server.use("*", (req: Request, res: Response) => {
      return res.status(404).json({ message: "route not found" });
    });
  }
}

export default new App().server;
