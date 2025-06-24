export class UnauthorizedError extends Error {
  constructor(message: string = "Invalid credentials") {
    super(message);
    this.name = "Unauthorized Error";
  }
}
