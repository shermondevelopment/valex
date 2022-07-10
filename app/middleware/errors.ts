import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

interface ErrorResponse {
  status: number
  message: string
}

export default (error: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status).json({ error: error.message })
}