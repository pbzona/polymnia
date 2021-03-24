const convert = require('color-convert')

// Constants for controlling hue wrap, limiting sat and val changes
const HUE_LIMIT = 360
const SATURATION_LIMIT = 100
const VALUE_LIMIT = 100

class Color {
  constructor(color) {
    // For now, we assume the input color is a hex code (with or without hash sign)
    this._color = color
  
    this._hsv = convert.hex.hsv(this._color)
    this._hue = this._hsv[0]
    this._saturation = this._hsv[1]
    this._value = this._hsv[2]

    // Bind private methods to `this` to expose
    this.adjustHue = this._adjustHue.bind(this)
    this.adjustSaturation = this._adjustSaturation.bind(this)
    this.adjustValue = this._adjustValue.bind(this)
    this.getComplement = this._getComplement.bind(this)
  }

  get hue() {
    return this._hue
  }

  get saturation() {
    return this._saturation
  }

  get value() {
    return this._value
  }

  get color() {
    return this._color
  }

  set color(c) {
    this._color = c
    this._hsv = convert.hex.hsv(c)
    this._hue = this._hsv[0]
    this._saturation = this._hsv[1]
    this._value = this._hsv[2]
    this._onUpdate()
  }

  _getComplement() {
    const complement = new this.constructor(this._color)
    complement.adjustHue(HUE_LIMIT / 2)
    return complement
  }

  _adjustHue(amt) {
    this._hue = (this._hue + amt) % HUE_LIMIT
    if (this._hue < 0) {
      this._hue = 360 - Math.abs(this._hue)
    }

    this._onUpdate()
  }

  _adjustSaturation(amt) {
    this._saturation += amt
    if (this._saturation < 0) {
      this._saturation = 0
    } else if (this._saturation > SATURATION_LIMIT) {
      this._saturation = SATURATION_LIMIT
    }

    this._onUpdate()
  }

  _adjustValue(amt) {
    this._value += amt
    if (this._value < 0) {
      this._value = 0
    } else if (this._value > VALUE_LIMIT) {
      this._value = VALUE_LIMIT
    }

    this._onUpdate()
  }

  _onUpdate() {
    const currentHSV = [this._hue, this._saturation, this._value]
    this._color = convert.hsv.hex(currentHSV)
    this._hsv = currentHSV
  }

  clone() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
  }
}

module.exports = Color