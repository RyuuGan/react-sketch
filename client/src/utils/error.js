export class ServerError extends Error {
  constructor(data = {}) {
    super(data.errorMessage || '');

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServerError);
    }

    this.code = data.errorCode;
    this.data = data.results;
    this.date = new Date();
    this.name = 'ServerError';
  }
}
