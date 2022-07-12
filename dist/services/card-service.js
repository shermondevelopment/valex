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
exports.encryptPass = exports.unBlockCardService = exports.blockCardService = exports.getTransactions = exports.enableCard = exports.addNewCard = void 0;
/** dayjs */
const dayjs_1 = __importDefault(require("dayjs"));
/** crypt */
const cryptr_1 = __importDefault(require("cryptr"));
/** utils */
const validEXpireDateCard_1 = require("../utils/validEXpireDateCard");
/** encrypt */
const bcrypt_1 = __importDefault(require("bcrypt"));
/** fake */
const faker_1 = require("@faker-js/faker");
/** employer repository  */
const employeeRepository_1 = require("../repositories/employeeRepository");
/** card employyed */
const cardRepository_1 = require("../repositories/cardRepository");
/** payments cards */
const paymentRepository_1 = require("../repositories/paymentRepository");
const addNewCard = (employeeId, type) => __awaiter(void 0, void 0, void 0, function* () {
    const employee = yield (0, employeeRepository_1.findById)(employeeId);
    // verify if employee exists
    if (!employee) {
        throw {
            status: 404,
            message: 'unregistered employee'
        };
    }
    const existTypeToEmployee = yield (0, cardRepository_1.findByTypeAndEmployeeId)(type, employeeId);
    if (existTypeToEmployee) {
        throw {
            status: 409,
            message: 'employee already has this benefit'
        };
    }
    const CardInfo = {
        employeeId,
        number: faker_1.faker.finance.creditCardNumber(),
        cardholderName: generateNameCard(employee.fullName),
        securityCode: encrypt(faker_1.faker.finance.creditCardCVV()),
        expirationDate: (0, dayjs_1.default)().add(5, 'year').locale('pt-br').format(`MM/YY`),
        password: null,
        isVirtual: false,
        originalCardId: null,
        isBlocked: false,
        type
    };
    (0, cardRepository_1.insert)(CardInfo);
});
exports.addNewCard = addNewCard;
const enableCard = (cardId, securityCode, password) => __awaiter(void 0, void 0, void 0, function* () {
    const card = yield (0, cardRepository_1.findById)(cardId);
    if (!card) {
        throw {
            status: 404,
            message: 'card does not exist'
        };
    }
    if (card.password) {
        throw {
            status: 409,
            message: 'card with password cannot be activated'
        };
    }
    if (password.length !== 4 && Number(password)) {
        throw {
            status: 422,
            message: 'password must contain 4 numeric characters'
        };
    }
    const decryptSecuritCode = decrypt(card.securityCode);
    console.log(decryptSecuritCode);
    if (decryptSecuritCode !== securityCode) {
        throw {
            status: 403,
            message: 'security code does not match'
        };
    }
    const expireCard = (0, validEXpireDateCard_1.validExpireDateCard)(card.expirationDate);
    if (expireCard) {
        throw {
            status: 400,
            message: 'card expired'
        };
    }
    const encryptPassword = (0, exports.encryptPass)(password);
    yield (0, cardRepository_1.update)(cardId, { password: encryptPassword });
});
exports.enableCard = enableCard;
const getTransactions = (cardId) => __awaiter(void 0, void 0, void 0, function* () {
    const card = yield (0, cardRepository_1.findById)(cardId);
    if (!card) {
        throw {
            status: 404,
            message: 'card not found'
        };
    }
    let amountCharge = 0;
    const charges = yield (0, paymentRepository_1.findByCardId)(cardId);
    if (charges.length > 0) {
        charges.forEach((charge) => amountCharge += charge.amount);
    }
    let amountPayments = 0;
    const payments = yield (0, paymentRepository_1.findByCardId)(cardId);
    if (payments.length > 0) {
        payments.forEach((payment) => amountPayments += payment.amount);
    }
    const chargeTotal = amountCharge - amountPayments;
    return {
        balance: chargeTotal,
        transactions: payments,
        recharges: charges
    };
});
exports.getTransactions = getTransactions;
const blockCardService = (id, password) => __awaiter(void 0, void 0, void 0, function* () {
    const card = yield (0, cardRepository_1.findById)(id);
    if (!card) {
        throw {
            status: 404,
            message: 'card not found'
        };
    }
    const cardExpired = (0, validEXpireDateCard_1.validExpireDateCard)(card.expirationDate);
    if (cardExpired) {
        throw {
            status: 422,
            message: 'card expired'
        };
    }
    if (card.isBlocked) {
        throw {
            status: 422,
            message: 'card is already blocked'
        };
    }
    if (!(yield bcrypt_1.default.compare(password, card.password))) {
        throw {
            status: 401,
            message: 'invalid password'
        };
    }
    yield (0, cardRepository_1.update)(id, { isBlocked: true });
});
exports.blockCardService = blockCardService;
const unBlockCardService = (id, password) => __awaiter(void 0, void 0, void 0, function* () {
    const card = yield (0, cardRepository_1.findById)(id);
    if (!card) {
        throw {
            status: 404,
            message: 'card not found'
        };
    }
    const cardExpired = (0, validEXpireDateCard_1.validExpireDateCard)(card.expirationDate);
    if (cardExpired) {
        throw {
            status: 422,
            message: 'card expired'
        };
    }
    if (!card.isBlocked) {
        throw {
            status: 422,
            message: 'card is already unlocked'
        };
    }
    if (!(yield bcrypt_1.default.compare(password, card.password))) {
        throw {
            status: 401,
            message: 'invalid password'
        };
    }
    yield (0, cardRepository_1.update)(id, { isBlocked: false });
});
exports.unBlockCardService = unBlockCardService;
const generateNameCard = (fullName) => {
    const splitFullName = fullName.split(' ');
    const name = [];
    splitFullName.forEach((item) => {
        if (item.length > 3) {
            name.push(item.toLocaleUpperCase());
        }
    });
    name.forEach((item, indice) => {
        if (item !== name.at(0) && item !== name.at(-1)) {
            name[indice] = name[indice].substring(0, 1);
        }
    });
    return name.join(' ');
};
const encrypt = (stringToEncrypt) => {
    const encryptString = new cryptr_1.default(process.env.ENCRYPT);
    return encryptString.encrypt(stringToEncrypt);
};
const decrypt = (stringToEncrypt) => {
    const descyptString = new cryptr_1.default(process.env.ENCRYPT);
    return descyptString.decrypt(stringToEncrypt);
};
const encryptPass = (password) => {
    const SALT = 10;
    const encryptedPassword = bcrypt_1.default.hashSync(password, SALT);
    return encryptedPassword;
};
exports.encryptPass = encryptPass;
