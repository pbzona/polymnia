const convert = require('color-convert')

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

  _adjustHue(amt) {
    this._hue = (this._hue + amt) % 360
    if (this._hue < 0) {
      this._hue = 360 - Math.abs(this._hue)
    }

    this._onUpdate()
  }

  _adjustSaturation(amt) {
    this._saturation += amt
    if (this._saturation < 0) {
      this._saturation = 0
    } else if (this._saturation > 100) {
      this._saturation = 100
    }

    this._onUpdate()
  }

  _adjustValue(amt) {
    this._value += amt
    if (this._value < 0) {
      this._value = 0
    } else if (this._value > 100) {
      this._value = 100
    }

    this._onUpdate()
  }

  _onUpdate() {
    const currentHSV = [this._hue, this._saturation, this._value]
    this._color = convert.hsv.hex(currentHSV)
    this._hsv = currentHSV
  }

}

module.exports = Color