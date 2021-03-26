// Assumes that "natural" light will tint yellow, while shadows will be purple
const NATURAL_LIGHT = 60
const NATURAL_SHADOW = 270

class HueSolver {
  constructor(hue, targetLight = NATURAL_LIGHT, targetShadow = NATURAL_SHADOW) {
    this.currentHue = hue
    this.targetLight = targetLight
    this.targetShadow = targetShadow
  }

  // Reduces value to shortest angle
  static getAngularDistance(current, target) {
    const phi = Math.abs(target - current) % 360
    const distance = phi > 180 ? 360 - phi : phi
    return distance
  }

  // Does not reduce value to shortest angle - used when order of args matters
  static getOrderedAngularDistance(current, target) {
    return Math.abs(target - current) % 360
  }

  static getHueShiftDirection(val, min, max) {
    // Negative return values indicate a reversed shift array
    // Positive indicates shift array can be used as generated
    return this._isBetween(val, min, max) ? -1 : 1
  }

  // To be used in more advanced automatic adjustments
  getDistanceToLight() {
    return this.constructor.getAngularDistance(this.currentHue, this.targetLight)
  }

  // To be used in more advanced automatic adjustments
  getDistanceToShadow() {
    return this.constructor.getAngularDistance(this.currentHue, this.targetShadow)
  }

  // Helper for getHueShiftDirection method
  _isBetween(value, min, max) {
    return value >= min && value <= max
  }
}

module.exports = HueSolver