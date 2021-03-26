const Color = require('../color/Color')
const Ramp = require('./Ramp')
const HueSolver = require('../HueSolver')

class LinearRamp extends Ramp {
  constructor(input, firstColor, secondColor) {
    super(input)

    this._validateSize()
    this._validateColor(firstColor)
    this._validateColor(secondColor)

    this._firstColor = firstColor
    this._secondColor = secondColor
  }

  get firstColor() {
    return this._firstColor
  }

  set firstColor(val) {
    this._firstColor = val
  }

  get secondColor() {
    return this._secondColor
  }

  set secondColor(val) {
    this._secondColor = val
  }

  apply() {
    this._interpolate(this._firstColor, this._secondColor)
  }

  _interpolate(start, end) {
    // Calculate hue steps
    let hueAngle = HueSolver.getOrderedAngularDistance(start.hue, end.hue)
    let hueDiff = Math.round(hueAngle / (this._size - 1))

    // Recalculate to use shortest distance
    if (hueAngle > 180) {
      hueAngle = (360 - hueAngle) * -1
      hueDiff = Math.round(hueAngle / (this._size - 1))
    } else if (start.hue > end.hue) {
      hueDiff *= -1
    }

    // Calculate saturation and value steps
    let satDiff = Math.round(Math.abs(end.saturation - start.saturation) / (this._size - 1))
    let valDiff = Math.round(Math.abs(end.value - start.value) / (this._size - 1))

    if (start.saturation > end.saturation) {
      satDiff *= -1
    }

    if (start.value > end.value) {
      valDiff *= -1
    }

    let colors = [start]
    for (let i = 1; i < this._size; i++) {
      //let nextColor = new Color(colors[i - 1].hex)
      let nextColor = colors[i - 1].clone()

      nextColor.adjustHue(hueDiff)
      nextColor.adjustSaturation(satDiff)
      nextColor.adjustValue(valDiff)

      colors.push(nextColor)
    }

    for (let [idx, color] of this._elements.entries()) {
      color.hex = colors[idx].hex
    }
  }

  _validateSize() {
    if (this._size < 2) {
      throw new Error('Size of LinearRamp cannot be less than 2')
    }
  }

  _validateColor(color) {
    if (!color instanceof Color) {
      throw new Error('Color input must be a Color object')
    }
  }
}

module.exports = LinearRamp