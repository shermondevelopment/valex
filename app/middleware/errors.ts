import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

interface ErrorResponse {
  status: number
  message: string
}

export default (error: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
  console.log(error)
  res.status(error.status).json({ error: error.message })
}