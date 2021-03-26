class Palette {
  constructor(ramps) {
    this.ramps = ramps || []
  }

  generateFromSingleRamp(numberOfRamps, hueShift) {
    // If no hueShift is provided, divide color space by number to evenly distribute ramps
    if (!hueShift || typeof hueShift !== 'number') {
      hueShift = Math.floor(360 / numberOfRamps)
    }

    // Assume number of ramps is inclusive of the given ramp
    for (let i of new Array(numberOfRamps - 1)) {
      
    }
  }
}