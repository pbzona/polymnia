const Color = require('./Color')

class Ramp {
  constructor(size) {
    this._elements = []
    for (let i of new Array(size)) {
      this._elements.push(new Color('FFFFFF'))
    }

    this._size = this._elements.length 
  }

  get elements() {
    return this._elements
  }

  apply() {
    // Virtual method to be overwritten by subclasses
    return undefined
  }
}

module.exports = Ramp
