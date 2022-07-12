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
exports.rechargeService = void 0;
/** cardId */
const cardRepository_1 = require("../repositories/cardRepository");
/** recharges repository */
const rechargeRepository_1 = require("../repositories/rechargeRepository");
/** utils */
const validEXpireDateCard_1 = require("../utils/validEXpireDateCard");
const rechargeService = (cardId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    if (amount <= 0) {
        throw {
            status: 422,
            message: 'please enter a value greater than zero'
        };
    }
    const card = yield (0, cardRepository_1.findById)(cardId);
    if (!card) {
        throw {
            status: 404,
            message: 'card not found'
        };
    }
    if (!card.password) {
        throw {
            status: 403,
            message: 'card not active'
        };
    }
    const cardExpired = (0, validEXpireDateCard_1.validExpireDateCard)(card.expirationDate);
    if (cardExpired) {
        throw {
            status: 422,
            message: 'card expired'
        };
    }
    yield (0, rechargeRepository_1.insert)({ cardId, amount });
});
exports.rechargeService = rechargeService;
