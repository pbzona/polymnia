const path = require('path')
const Jimp = require('jimp')

class Exporter {
  constructor(swatchSize, ramp, outFile) {
    this._swatchSize = swatchSize
    this._ramp = ramp
    this._outFile = outFile
  }

  exportPNG() {
    return new Jimp(this._swatchSize * this._ramp.elements.length, this._swatchSize, this._createImage);
  }

  _formatColorData() {
    // Create first row
    let row = []
    let counter = 1
    let colorIdx = 0

    for (let i of new Array(this._swatchSize * this._ramp.elements.length)) {
      row.push(`0x${this._ramp.elements[colorIdx].hex}FF`)
      counter++
      if (counter > this._swatchSize) {
        counter = 1
        colorIdx++
      }
    }

    // Create all rows
    let data = []
    for (let j of new Array(this._swatchSize)) {
      data.push(row)
    }

    return data
  }

  // Must be an arrow function for correct context lookup
  _createImage = (err, image) => {
    if (err) throw err;

    const imageData = this._formatColorData()

    imageData.forEach((row, y) => {
      row.forEach((color, x) => {
        image.setPixelColor(parseInt(color, 16), x, y);
      });
    });
  
    image.write(this._outFile, (err) => {
      if (err) throw err;
    });
  }
}

module.exports = Exporter