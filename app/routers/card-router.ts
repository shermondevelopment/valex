/** router */
import { Router } from 'express'

/** middlewares */
import authCompanies  from '../middleware/business-auth'

/** controllers */
import { newCard, activeCard, getTransactionsOfCard, blockCard, unBlockCard } from '../controllers/card-controller'

const cardRouter = Router()

/** new card */
cardRouter.post('/new-card/:id', authCompanies, newCard)

/** enable card */
cardRouter.post('/enable-card/:id', activeCard)

/** get transaction */
cardRouter.get('/transaction-card/:id', getTransactionsOfCard)

/** blocked cards */
cardRouter.post('/block-card/:id', blockCard)

/** unblock card */
cardRouter.post('/unblock-card/:id', unBlockCard)





export default cardRouter