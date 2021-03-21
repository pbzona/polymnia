class StepGenerator {
  constructor(size) {
    this._size = size
    this._middleIndex = Math.floor(size / 2)
    this._steps = null
  }

  get steps() {
    return this._steps
  }

  createLinearSteps(amt) {
    // Create an increasing shift of values to be applied as the adjustment on each color in this.elements
    // Shift should start negative and increase to positive, with 0 at the midpoint
    // For example, size 5 and amt 10 should be [-20, -10, 0, 10, 20]
    let linearSteps = []

    for (let i = 0; i < this._size; i++) {
      linearSteps.push(amt * (i - this._middleIndex))
    }
    
    this._steps = linearSteps
  }

  createCurveSteps(amt) {
    // Create a ramp of values that peaks at the midpoint, then decreases at the same rate
    // Ramp should be negative on both sides, with 0 the highest point in the middle
    // For example, size 5 and amt 10 should be [-20, -10, 0, -10, -20]
    let curveShift = []

    for (let i = 0; i < this._size; i++) {
      curveShift.push(amt * Math.abs(i - this._middleIndex) * -1)
    }
    
    this._steps = curveShift
  }
}

module.exports = StepGenerator