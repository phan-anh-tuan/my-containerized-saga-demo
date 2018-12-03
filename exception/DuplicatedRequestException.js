export default class DuplicatedRequestException extends Error {
    constructor(message) {
      super(message);
      this.name = "DuplicatedRequestException";
    }
  }