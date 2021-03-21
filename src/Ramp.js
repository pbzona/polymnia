const Color = require("./Color")
const StepGenerator = require('./StepGenerator')

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

    this.stepGenerator = new StepGenerator(this.size)

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
    this.stepGenerator.createLinearSteps(this.hueShift)
    this.hueSteps = this.reverseHueShift ? this.stepGenerator.steps.reverse() : this.stepGenerator.steps
  }

  _applyHueShift() {
    for (let [idx, color] of this.elements.entries()) {
      color.adjustHue(this.hueSteps[idx])
    }
  }

  _updateSaturationSteps() {
    this.stepGenerator.createCurveSteps(this.saturationShift)
    this.saturationSteps = this.stepGenerator.steps
  }
  
  _applySaturationShift() {
    for (let [idx, color] of this.elements.entries()) {
      color.adjustSaturation(this.saturationSteps[idx])
    }
  }

  _updateValueSteps() {
    this.stepGenerator.createLinearSteps(this.valueShift)
    this.valueSteps = this.stepGenerator.steps
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
}

module.exports = { MidpointRamp }