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
exports.buy = void 0;
/** service */
const buy_service_1 = require("../services/buy-service");
const buy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cardId, password, businessId, amount } = req.body;
    yield (0, buy_service_1.buyService)(cardId, password, businessId, amount);
    res.sendStatus(201);
});
exports.buy = buy;
