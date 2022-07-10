/** express */
import { Request, Response, NextFunction  } from 'express'

/** repository */
import { findByApiKey } from '../repositories/companyRepository'

export default async (req: Request, res: Response, next: NextFunction) => {


  const apiKey = req.headers["x-api-key"]

  if (!apiKey) {
    throw {
      status: 403,
      message: 'api key not provided'
    }
  }


  const company = await findByApiKey(apiKey as string)


  if (!company) {
    throw {
      status: 401,
      message: 'company does not have access'
    }
  }


  res.locals.apiKey = apiKey

  next()

}