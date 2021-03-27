const Color = require("../color/Color")
const Ramp = require('./Ramp')
const StepGenerator = require('../StepGenerator')

class MidpointRamp extends Ramp {
  constructor(input, midpoint) {
    super(input)
    
    this._validateSize()
    this._validateMidpoint(midpoint)
    this._midpoint = midpoint

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

  get midpoint() {
    return this._midpoint
  }

  set midpoint(val) {
    this._validateMidpoint(val)
    this._midpoint = val
  }

  get hueStepSize() {
    return this._hueStepSize
  }

  set hueStepSize(val) {
    this._hueStepSize = val
    this._updateHueSteps()
  }

  get saturationStepSize() {
    return this._hueStepSize
  }

  set saturationStepSize(val) {
    this._saturationStepSize = val
    this._updateSaturationSteps()
  }

  get valueStepSize() {
    return this._valueStepSize
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

  clone() {
    // Manually copy values for now until I figure out how to abstract this
    let clone = new this.constructor(this._size, this._midpoint)
    clone.size = this._size
    clone.hueStepSize = this._hueStepSize
    clone.saturationStepSize = this._saturationStepSize
    clone.valueStepSize = this._valueStepSize
    clone.reverseHueShift = this._reverseHueShift
    clone.apply()

    return clone
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
      this._midpoint = midpoint
      for (let i of this._elements) {
        i.hex = midpoint.hex
      }
    } else {
      throw new Error('Midpoint must be a Color object')
    }
  }
}

module.exports = MidpointRamp