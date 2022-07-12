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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buyService = void 0;
/** card reposittory */
const cardRepository_1 = require("../repositories/cardRepository");
/** findBusiness */
const businessRepository_1 = require("../repositories/businessRepository");
/** */
const rechargeRepository_1 = require("../repositories/rechargeRepository");
/** payment */
const paymentRepository_1 = require("../repositories/paymentRepository");
/** bcrypt */
const bcrypt_1 = __importDefault(require("bcrypt"));
/** utils */
const validEXpireDateCard_1 = require("../utils/validEXpireDateCard");
const buyService = (cardId, password, businessId, amount) => __awaiter(void 0, void 0, void 0, function* () {
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
    if (!(yield bcrypt_1.default.compare(password, card.password))) {
        throw {
            status: 401,
            message: 'invalid password'
        };
    }
    const business = yield (0, businessRepository_1.findById)(businessId);
    console.log(business, businessId);
    if (!business) {
        throw {
            status: 404,
            message: 'business not exists'
        };
    }
    if (card.type !== business.type) {
        throw {
            status: 404,
            message: 'type not permited'
        };
    }
    let amountCha = 0;
    const charge = yield (0, rechargeRepository_1.findByCardId)(cardId);
    if (charge.length > 0) {
        charge.forEach((charge) => amountCha += charge.amount);
    }
    let amountPayment = 0;
    const payment = yield (0, paymentRepository_1.findByCardId)(cardId);
    if (payment.length > 0) {
        payment.forEach((payment) => amountPayment += payment.amount);
    }
    const total = amountCha - amountPayment;
    if (total < amount) {
        throw {
            status: 403,
            message: 'you have no limit'
        };
    }
    yield (0, paymentRepository_1.insert)({ cardId, businessId, amount });
});
exports.buyService = buyService;
