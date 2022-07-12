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
exports.unBlockCard = exports.blockCard = exports.getTransactionsOfCard = exports.activeCard = exports.newCard = void 0;
/** services */
const card_service_1 = require("../services/card-service");
const newCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { type } = req.body;
    yield (0, card_service_1.addNewCard)(Number(id), type);
    res.sendStatus(204);
});
exports.newCard = newCard;
const activeCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { securityCode, password } = req.body;
    yield (0, card_service_1.enableCard)(Number(id), securityCode, password);
    res.sendStatus(204);
});
exports.activeCard = activeCard;
const getTransactionsOfCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const transaction = yield (0, card_service_1.getTransactions)(Number(id));
    res.status(200).json(transaction);
});
exports.getTransactionsOfCard = getTransactionsOfCard;
const blockCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { password } = req.body;
    yield (0, card_service_1.blockCardService)(Number(id), password);
    res.sendStatus(204);
});
exports.blockCard = blockCard;
const unBlockCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { password } = req.body;
    yield (0, card_service_1.unBlockCardService)(Number(id), password);
    res.sendStatus(204);
});
exports.unBlockCard = unBlockCard;
