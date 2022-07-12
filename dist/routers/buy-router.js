"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** router */
const express_1 = require("express");
/** buy router */
const buyRouter = (0, express_1.Router)();
/** middleware  */
const validateSchema_1 = __importDefault(require("../middleware/validateSchema"));
/** validade */
const buy_validation_1 = __importDefault(require("../validation/buy-validation"));
/** controller */
const buy_controller_1 = require("../controllers/buy-controller");
/** buy */
buyRouter.post('/buy', (0, validateSchema_1.default)(buy_validation_1.default), buy_controller_1.buy);
exports.default = buyRouter;
