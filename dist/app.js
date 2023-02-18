"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorMiddleware_1 = __importDefault(require("./middleware/errorMiddleware"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const noteRoute_1 = __importDefault(require("./routes/noteRoute"));
class App {
    constructor() {
        this.server = (0, express_1.default)();
        this.middlewares();
        this.routes();
        this.initializeErrorhandler();
        this.catchRouteNotFoundHandler();
    }
    middlewares() {
        this.server.use(express_1.default.json());
    }
    routes() {
        this.server.use("/api/v1/auth", authRoute_1.default);
        this.server.use("/api/v1/note", noteRoute_1.default);
    }
    initializeErrorhandler() {
        this.server.use(errorMiddleware_1.default);
    }
    catchRouteNotFoundHandler() {
        this.server.use("*", (req, res) => {
            return res.status(404).json({ message: "route not found" });
        });
    }
}
exports.default = new App().server;
//# sourceMappingURL=app.js.map