"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** router */
const express_1 = require("express");
/** middlewares */
const business_auth_1 = __importDefault(require("../middleware/business-auth"));
const validateSchema_1 = __importDefault(require("../middleware/validateSchema"));
/** controllers */
const recharge_controller_1 = require("../controllers/recharge-controller");
/** validation */
const recharge_validation_1 = __importDefault(require("../validation/recharge-validation"));
const rechargeRouter = (0, express_1.Router)();
/** rechargers */
rechargeRouter.post('/recharge/:id', business_auth_1.default, (0, validateSchema_1.default)(recharge_validation_1.default), recharge_controller_1.recharge);
exports.default = rechargeRouter;
