const Color = require("./Color")

class Ramp {
  constructor(size) {
    this.elements = []
    for (let i of new Array(size)) {
      this.elements.push(new Color('FFFFFF'))
    }

    this.size = this.elements.length 
  }

  // Private methods
  _generateRamp() {
    // Virtual method to be overwritten by subclasses
    return undefined
  }
}

class MidpointRamp extends Ramp {
  constructor(input, midpoint) {
    super(input)
    
    this._validateSize()

    if (midpoint instanceof Color) {
      this.midpoint = midpoint
      for (let i of this.elements) {
        i.hex = midpoint.color
      }
    } else {
      throw new Error('Midpoint must be a Color object')
    }

    // Todo - control setters for these so that saturation doesn't bottom out before left side of ramp
    // and value doesn't top out before right side
    this.hueShift = 0
    this.saturationShift = 0
    this.valueShift = 0

    this.hueSteps = []
    this.saturationSteps = []
    this.valueSteps = []

    this.reverseHueShift = false // Good for greens, blues

  }

  set hueStepSize(val) {
    this.hueShift = val
    this._updateHueSteps()
  } 

  set saturationStepSize(val) {
    this.saturationShift = val
    this._updateSaturationSteps()
  }

  set valueStepSize(val) {
    this.valueShift = val
    this._updateValueSteps()
  }

  set reverseHue(val) {
    this.reverseHueShift = val
    this._updateHueSteps()
  }

  apply() {
    this._applyHueShift()
    this._applySaturationShift()
    this._applyValueShift()
  }

  // Private methods
  _updateHueSteps() {
    const shift = this._createLinearShift(this.hueShift)
    this.hueSteps = this.reverseHueShift ? shift.reverse() : shift
  }

  _applyHueShift() {
    for (let [idx, color] of this.elements.entries()) {
      color.adjustHue(this.hueSteps[idx])
    }
  }

  _updateSaturationSteps() {
    this.saturationSteps = this._createCurveShift(this.saturationShift)
  }
  
  _applySaturationShift() {
    for (let [idx, color] of this.elements.entries()) {
      color.adjustSaturation(this.saturationSteps[idx])
    }
  }

  _updateValueSteps() {
    this.valueSteps = this._createLinearShift(this.valueShift)
  }

  _applyValueShift() {
    for (let [idx, color] of this.elements.entries()) {
      color.adjustValue(this.valueSteps[idx])
    }
  }

  _validateSize() {
    if (this.size % 2 === 0 || typeof this.size !== 'number') {
      throw new Error('Size must be an odd integer for MidpointRamp')
    } else {
      return
    }
  }

  _createLinearShift(amt) {
    // Create an increasing shift of values to be applied as the adjustment on each color in this.elements
    // Shift should start negative and increase to positive, with 0 at the midpoint
    // For example, size 5 and amt 10 should be [-20, -10, 0, 10, 20]
    const middleIndex = Math.floor(this.size / 2)
    let linearShift = []

    for (let i = 0; i < this.size; i++) {
      linearShift.push(amt * (i - middleIndex))
    }
    
    return linearShift
  }

  _createCurveShift(amt) {
    // Create a ramp of values that peaks at the midpoint, then decreases at the same rate
    // Ramp should be negative on both sides, with 0 the highest point in the middle
    // For example, size 5 and amt 10 should be [-20, -10, 0, -10, -20]
    const middleIndex = Math.floor(this.size / 2)
    let curveShift = []

    for (let i = 0; i < this.size; i++) {
      curveShift.push(amt * Math.abs(i - middleIndex) * -1)
    }
    
    return curveShift
  }
}

module.exports = { MidpointRamp }