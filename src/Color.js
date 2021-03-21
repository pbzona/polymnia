const convert = require('color-convert')

class Color {
  constructor(color) {
    // For now, we assume the input color is a hex code (with or without hash sign)
    this.color = color
  
    this.hsv = convert.hex.hsv(this.color)
    this.h = this.hsv[0]
    this.s = this.hsv[1]
    this.v = this.hsv[2]

    this.adjustHue = this.adjustHue.bind(this)
    this.adjustSaturation = this.adjustSaturation.bind(this)
    this.adjustValue = this.adjustValue.bind(this)
  }

  set hex(c) {
    this.color = c
    this.hsv = convert.hex.hsv(this.color)
    this.h = this.hsv[0]
    this.s = this.hsv[1]
    this.v = this.hsv[2]
    this._onUpdate()
  }

  adjustHue(amt) {
    this.h = (this.h + amt) % 360
    if (this.h < 0) {
      this.h = 360 - Math.abs(this.h)
    }

    this._onUpdate()
  }

  adjustSaturation(amt) {
    this.s += amt
    if (this.s < 0) {
      this.s = 0
    } else if (this.s > 100) {
      this.s = 100
    }

    this._onUpdate()
  }

  adjustValue(amt) {
    this.v += amt
    if (this.v < 0) {
      this.v = 0
    } else if (this.v > 100) {
      this.v = 100
    }

    this._onUpdate()
  }

  _onUpdate() {
    const currentHSV = [this.h, this.s, this.v]

    this.color = convert.hsv.hex(currentHSV)
    this.hsv = currentHSV
  }

}

module.exports = Color