const Ramp = require('../ramp/Ramp')

class Palette {
  constructor(ramps) {
    this._ramps = ramps || []
  }

  generateFromSingleRamp(numberOfRamps, hueShift) {
    // If no hueShift is provided, divide color space by number to evenly distribute ramps
    if (!hueShift || typeof hueShift !== 'number') {
      hueShift = Math.floor(360 / numberOfRamps)
    }

    // Todo - implement the rest of this
    // This method should generate n ramps by applying a global hue shift 
    // to a single ramp and add it to the ramps prop
  }

  addRamp(ramp) {
    if (!ramp instanceof Ramp) {
      throw new Error('Ramp to add must be a Ramp object')
    }
    this._ramps.push(ramp)
  }

  applyGlobalHueShift(amt) {
    this._ramps.forEach(ramp => {
      ramp.applyGlobalHueShift(amt)
    })
  }

  applyGlobalSaturationShift(amt) {
    this._ramps.forEach(ramp => {
      ramp.applyGlobalSaturationShift(amt)
    })
  }

  applyGlobalValueShift(amt) {
    this._ramps.forEach(ramp => {
      ramp.applyGlobalValueShift(amt)
    })
  }
}

module.exports = Palette