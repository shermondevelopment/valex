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
/** validade */
const card_validation_1 = require("../validation/card-validation");
/** controllers */
const card_controller_1 = require("../controllers/card-controller");
const cardRouter = (0, express_1.Router)();
/** new card */
cardRouter.post('/new-card/:id', business_auth_1.default, (0, validateSchema_1.default)(card_validation_1.newCardSchema), card_controller_1.newCard);
/** enable card */
cardRouter.post('/enable-card/:id', (0, validateSchema_1.default)(card_validation_1.enableCardSchema), card_controller_1.activeCard);
/** get transaction */
cardRouter.get('/transaction-card/:id', card_controller_1.getTransactionsOfCard);
/** blocked cards */
cardRouter.post('/block-card/:id', (0, validateSchema_1.default)(card_validation_1.passwordSchema), card_controller_1.blockCard);
/** unblock card */
cardRouter.post('/unblock-card/:id', (0, validateSchema_1.default)(card_validation_1.passwordSchema), card_controller_1.unBlockCard);
exports.default = cardRouter;
