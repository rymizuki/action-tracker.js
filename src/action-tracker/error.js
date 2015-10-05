export default class CustomError {
  constructor (err, options={}) {
    if ('object' == typeof err) {
      this.name     = err.name
      this.message  = err.message
      this.stack    = err.stack || ''
    } else {
      this.name     = err
      this.message  = err
      this.stack    = ''
    }
    this.ua       = navigator.userAgent
    this.options  = options
  }
  stringify () {
    return JSON.stringify(this.jsonify())
  }
  jsonify () {
    return Object.assign(( this.options.data || {} ), {
      name:     this.name,
      message:  this.message,
      stack:    this.stack,
      ua:       this.ua
    })
  }
}
