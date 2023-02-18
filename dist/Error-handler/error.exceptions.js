"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorException = void 0;
const error_code_1 = require("./error.code");
class ErrorException extends Error {
    constructor(code = error_code_1.ErrorCode.INTERNAL_SERVER_ERROR, metaData = null) {
        super(code);
        this.status = null;
        this.metaData = null;
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = code;
        this.status = 500;
        this.metaData = metaData;
        switch (code) {
            case error_code_1.ErrorCode.Unauthenticated:
                this.status = 401;
                break;
            case error_code_1.ErrorCode.FOBIDDEN_ERROR:
                this.status = 403;
                break;
            case error_code_1.ErrorCode.NO_CONTENT:
                this.status = 204;
                break;
            case error_code_1.ErrorCode.AsyncError:
                this.status = 400;
                break;
            case error_code_1.ErrorCode.CONFLIT:
                this.status = 409;
                break;
            case error_code_1.ErrorCode.VALIDATE_ERROR:
                this.status = 406;
                break;
            case error_code_1.ErrorCode.NotFound:
                this.status = 404;
                break;
            default:
                this.status = 500;
                break;
        }
    }
}
exports.ErrorException = ErrorException;
//# sourceMappingURL=error.exceptions.js.map