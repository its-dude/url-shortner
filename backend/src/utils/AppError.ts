export class AppError extends Error {
  public statusCode: number
  public isOperational: boolean
  public location: string | undefined

  constructor(message: string, statusCode: number, location?: string ) {
    super(message)

    this.statusCode = statusCode
    this.isOperational = true
    this.location = location

    Error.captureStackTrace(this, this.constructor)
  }
}
