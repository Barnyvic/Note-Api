"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_code_1 = require("../Error-handler/error.code");
const error_exceptions_1 = require("../Error-handler/error.exceptions");
const errorHandleMiddleware = (err, request, response, next) => {
    console.log("Error handling middleware called.");
    console.log("Path:", request.path);
    console.error("Error occured:", err);
    if (err instanceof error_exceptions_1.ErrorException) {
        console.log("Error is known.");
        response.status(err.status).send(err);
    }
    else {
        // For unhandled errors.
        response.status(500).send({
            code: error_code_1.ErrorCode.INTERNAL_SERVER_ERROR,
            status: 500,
        });
    }
};
exports.default = errorHandleMiddleware;
//# sourceMappingURL=errorMiddleware.js.map