"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = exports.handleError = exports.errorResponse = void 0;
function successResponse(res, statusCode, message, data = []) {
    const resobj = { statusCode, message, data };
    return res.status(statusCode).send(resobj);
}
exports.successResponse = successResponse;
function handleError(req, error) {
    console.log(`
        Errormessage: ${JSON.stringify(error.message)},caught at: ${JSON.stringify(req.path)}
    `);
}
exports.handleError = handleError;
function errorResponse(res, statusCode, error) {
    const resobj = { statusCode, error };
    return res.status(statusCode).send(resobj);
}
exports.errorResponse = errorResponse;
//# sourceMappingURL=response.js.map