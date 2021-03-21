const path = require('path')
const Jimp = require('jimp')

class Exporter {
  constructor(swatchSize, ramp, outFile) {
    this.swatchSize = swatchSize
    this.ramp = ramp
    this.outFile = outFile
  }

  formatColorData() {
    // Create first row
    let row = []
    let counter = 1
    let colorIdx = 0

    for (let i of new Array(this.swatchSize * this.ramp.elements.length)) {
      row.push(`0x${this.ramp.elements[colorIdx].color}FF`)
      counter++
      if (counter > this.swatchSize) {
        counter = 1
        colorIdx++
      }
    }

    // Create all rows
    let data = []
    for (let j of new Array(this.swatchSize)) {
      data.push(row)
    }

    return data
  }

  exportPNG() {
    return new Jimp(this.swatchSize * this.ramp.elements.length, this.swatchSize, this.createImage);
  }

  // Must be an arrow function for correct context lookup
  createImage = (err, image) => {
    if (err) throw err;

    const imageData = this.formatColorData()

    imageData.forEach((row, y) => {
      row.forEach((color, x) => {
        image.setPixelColor(parseInt(color, 16), x, y);
      });
    });
  
    image.write(this.outFile, (err) => {
      if (err) throw err;
    });
  }
}

module.exports = Exporter