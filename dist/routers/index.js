"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** router */
const express_1 = require("express");
/** recharges router */
const recharge_router_1 = __importDefault(require("./recharge-router"));
/** card router */
const card_router_1 = __importDefault(require("./card-router"));
/** buy router */
const buy_router_1 = __importDefault(require("./buy-router"));
const router = (0, express_1.Router)();
router.use(recharge_router_1.default);
router.use(card_router_1.default);
router.use(buy_router_1.default);
exports.default = router;
