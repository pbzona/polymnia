const Color = require("../Color")
const Ramp = require('../Ramp')
const StepGenerator = require('../StepGenerator')

class MidpointRamp extends Ramp {
  constructor(input, midpoint) {
    super(input)
    
    this._validateSize()
    this._validateMidpoint(midpoint)

    this._stepGenerator = new StepGenerator(this._size)

    // Todo - control setters for these so that saturation doesn't bottom out before left side of ramp
    // and value doesn't top out before right side
    this._hueStepSize = 0
    this._saturationStepSize = 0
    this._valueStepSize = 0

    this._hueSteps = []
    this._saturationSteps = []
    this._valueSteps = []

    this._reverseHueShift = false // Good for greens, blues
  }

  set size(val) {
    this._size = val
    this._stepGenerator = new StepGenerator(this._size)
  }

  set hueStepSize(val) {
    this._hueStepSize = val
    this._updateHueSteps()
  } 

  set saturationStepSize(val) {
    this._saturationStepSize = val
    this._updateSaturationSteps()
  }

  set valueStepSize(val) {
    this._valueStepSize = val
    this._updateValueSteps()
  }

  set reverseHueShift(val) {
    this._reverseHueShift = val
    this._updateHueSteps()
  }

  apply() {
    this._applyHueShift()
    this._applySaturationShift()
    this._applyValueShift()
  }

  // Private methods
  _updateHueSteps() {
    this._stepGenerator.createLinearSteps(this._hueStepSize)
    this._hueSteps = this._reverseHueShift ? this._stepGenerator.steps.reverse() : this._stepGenerator.steps
  }

  _applyHueShift() {
    for (let [idx, color] of this._elements.entries()) {
      color.adjustHue(this._hueSteps[idx])
    }
  }

  _updateSaturationSteps() {
    this._stepGenerator.createCurveSteps(this._saturationStepSize)
    this._saturationSteps = this._stepGenerator.steps
  }
  
  _applySaturationShift() {
    for (let [idx, color] of this._elements.entries()) {
      color.adjustSaturation(this._saturationSteps[idx])
    }
  }

  _updateValueSteps() {
    this._stepGenerator.createLinearSteps(this._valueStepSize)
    this._valueSteps = this._stepGenerator.steps
  }

  _applyValueShift() {
    for (let [idx, color] of this._elements.entries()) {
      color.adjustValue(this._valueSteps[idx])
    }
  }

  _validateSize() {
    if (this._size % 2 === 0 || typeof this._size !== 'number') {
      throw new Error('Size must be an odd integer for MidpointRamp')
    } else {
      return
    }
  }

  _validateMidpoint(midpoint) {
    if (midpoint instanceof Color) {
      this.midpoint = midpoint
      for (let i of this._elements) {
        i.hex = midpoint.color
      }
    } else {
      throw new Error('Midpoint must be a Color object')
    }
  }
}

module.exports = MidpointRamp