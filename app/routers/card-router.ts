/** router */
import { Router } from 'express'

/** middlewares */
import authCompanies  from '../middleware/business-auth'

import validate from '../middleware/validateSchema'

/** validade */
import { newCardSchema, enableCardSchema, passwordSchema } from '../validation/card-validation'

/** controllers */
import { newCard, activeCard, getTransactionsOfCard, blockCard, unBlockCard } from '../controllers/card-controller'

const cardRouter = Router()

/** new card */
cardRouter.post('/new-card/:id', authCompanies, validate(newCardSchema), newCard)

/** enable card */
cardRouter.post('/enable-card/:id', validate(enableCardSchema), activeCard)

/** get transaction */
cardRouter.get('/transaction-card/:id', getTransactionsOfCard)

/** blocked cards */
cardRouter.post('/block-card/:id', validate(passwordSchema), blockCard)

/** unblock card */
cardRouter.post('/unblock-card/:id', validate(passwordSchema), unBlockCard)





export default cardRouter