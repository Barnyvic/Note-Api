import express, { Express, Request, Response } from "express";
import helmet from "helmet";

import errorMiddleware from "./middleware/errorMiddleware";
import AuthRouter from "./routes/authRoute";
import NoteRouter from "./routes/noteRoute";

class App {
  public server: Express;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.initializeErrorhandler();
    this.rootRoute();
    this.catchRouteNotFoundHandler();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
    this.server.use(helmet());
  }

  routes() {
    this.server.use("/api/v1/auth", AuthRouter);
    this.server.use("/api/v1/note", NoteRouter);
  }

  private initializeErrorhandler() {
    this.server.use(errorMiddleware);
  }

  rootRoute() {
    this.server.get("/", (req: Request, res: Response) => {
      return res.status(200).json({ message: "Welcome to Note API" });
    });
  }

  catchRouteNotFoundHandler() {
    this.server.use("*", (req: Request, res: Response) => {
      return res
        .status(404)
        .json({ message: "Sorry, that route doesn't exist" });
    });
  }
}

export default new App().server;
