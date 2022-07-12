"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validExpireDateCard = void 0;
/** dayjs */
const dayjs_1 = __importDefault(require("dayjs"));
const validExpireDateCard = (expirationDate) => {
    const expirationDateDay = `01/${expirationDate}`;
    const differenceDates = (0, dayjs_1.default)(expirationDateDay, 'DD/MM/YY').diff((0, dayjs_1.default)().format('DD/MM/YY'), 'month');
    if (differenceDates <= 0)
        return true;
    return false;
};
exports.validExpireDateCard = validExpireDateCard;
