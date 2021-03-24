const Util = require('./Util')

// Assumes that "natural" light will tint yellow, while shadows will be purple
const NATURAL_LIGHT = 60
const NATURAL_SHADOW = 270

class LightSolver {
  constructor(hue, targetLight = NATURAL_LIGHT, targetShadow = NATURAL_SHADOW) {
    this.currentHue = hue
    this.targetLight = targetLight
    this.targetShadow = targetShadow
  }

  // To be used in more advanced automatic adjustments
  getDistanceToLight() {
    return Util.getAngularDistance(this.currentHue, this.targetLight)
  }

  // To be used in more advanced automatic adjustments
  getDistanceToShadow() {
    return Util.getAngularDistance(this.currentHue, this.targetShadow)
  }

  getHueShiftDirection() {
    // Negative return values indicate a reversed shift array
    // Positive indicates shift array can be used as generated
    return this._isBetween(this.currentHue, this.targetLight, this.targetShadow) ? -1 : 1
  }

  // Helper for getHueShiftDirection method
  _isBetween(value, min, max) {
    return value >= min && value <= max
  }
}

console.log(Util.getAngularDistance)

const l = new LightSolver(30)
console.log(l.getDistanceToLight())
console.log(l.getDistanceToShadow())