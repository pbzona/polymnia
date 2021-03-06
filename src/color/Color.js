const convert = require('color-convert')

// Constants for controlling hue wrap, limiting sat and val changes
const HUE_LIMIT = 360
const SATURATION_LIMIT = 100
const VALUE_LIMIT = 100

class Color {
  constructor(hex) {
    // For now, we assume the input color is a hex code (with or without hash sign)
    this._hex = hex
  
    this._hsv = convert.hex.hsv(this._hex)
    this._hue = this._hsv[0]
    this._saturation = this._hsv[1]
    this._value = this._hsv[2]
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

  get hex() {
    return this._hex
  }

  set hex(c) {
    this._hex = c
    this._hsv = convert.hex.hsv(c)
    this._hue = this._hsv[0]
    this._saturation = this._hsv[1]
    this._value = this._hsv[2]
    this._onUpdate()
  }

  clone() {
    return new this.constructor(this.hex)
  }

  getComplement() {
    const complement = new this.constructor(this._hex)
    complement.adjustHue(HUE_LIMIT / 2)
    return complement
  }

  adjustHue(amt) {
    this._hue = (this._hue + amt) % HUE_LIMIT
    if (this._hue < 0) {
      this._hue = 360 - Math.abs(this._hue)
    }

    this._onUpdate()
  }

  adjustSaturation(amt) {
    this._saturation += amt
    if (this._saturation < 0) {
      this._saturation = 0
    } else if (this._saturation > SATURATION_LIMIT) {
      this._saturation = SATURATION_LIMIT
    }

    this._onUpdate()
  }

  adjustValue(amt) {
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
    this._hex = convert.hsv.hex(currentHSV)
    this._hsv = currentHSV
  }
}

module.exports = Color