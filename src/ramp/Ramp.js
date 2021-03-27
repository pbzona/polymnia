const Color = require('../color/Color')

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

  reset() {
    // Allows reset of all colors for generation from scratch - avoids harsh contrast
    // by running #apply multiple times
    for (let c of this._elements) {
      c.hex = 'FFFFFF'
    }
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

  clone() {
    // https://stackoverflow.com/questions/41474986/how-to-clone-a-javascript-es6-class-instance
    // Is this really the best way to deep clone?
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
  }
}

module.exports = Ramp
