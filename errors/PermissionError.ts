export default class PermissionError extends Error {
  private readonly defaultMessage = 'Permissão não aceita!'

  constructor () {
    super()
    this.message = this.defaultMessage
  }
}
