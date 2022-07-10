/** */
import 'express-async-errors'

/** dotenv */
import 'dotenv/config'

/* errors */
import errorHandler from './middleware/errors' 

/** routers */
import router from './routers'

/** express */
import express, { json } from 'express'

/** cors */
import cors from 'cors'

/* initial server */
const app = express()


/** setting server */
app.use(json())
app.use(cors())
app.use(router)
app.use(errorHandler)

/** running server */
app.listen(process.env.PORT || 5000, () =>  console.log(`app running in port ${process.env.PORT} 🚀🚀🚀🚀`))