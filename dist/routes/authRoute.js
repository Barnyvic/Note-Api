"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../Controllers/authController");
const authController_2 = require("../Controllers/authController");
const AuthRouter = (0, express_1.Router)();
AuthRouter.route("/signup").post(authController_2.createUser);
AuthRouter.route("/login").post(authController_1.login);
exports.default = AuthRouter;
//# sourceMappingURL=authRoute.js.map