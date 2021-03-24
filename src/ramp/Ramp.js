const Color = require('../Color')

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

  applyGlobalHueShift(amt) {
    this._elements.forEach(color => {
      color.adjustHue(amt)
    })
  }

  applyGlobalSaturationShift(amt) {
    this._elements.forEach(color => {
      color.adjustSaturation(amt)
    })
  }

  applyGlobalValueShift(amt) {
    this._elements.forEach(color => {
      color.adjustValue(amt)
    })
  }
}

module.exports = Ramp
