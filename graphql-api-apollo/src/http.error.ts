export class HttpError extends Error {
  constructor (public _message: string, public code: number) {
    super(_message)
  }

  static create(message: string, code: number): HttpError {
    return new HttpError(message, code)
  }

  get message () {
    return `[${this.code}] : ${this._message}`
  }
}
