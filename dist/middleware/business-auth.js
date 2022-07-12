"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/** repository */
const companyRepository_1 = require("../repositories/companyRepository");
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const apiKey = req.headers["x-api-key"];
    if (!apiKey) {
        throw {
            status: 403,
            message: 'api key not provided'
        };
    }
    const company = yield (0, companyRepository_1.findByApiKey)(apiKey);
    if (!company) {
        throw {
            status: 401,
            message: 'company does not have access'
        };
    }
    res.locals.apiKey = apiKey;
    next();
});
