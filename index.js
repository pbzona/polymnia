const Color = require('./src/Color')
const { MidpointRamp } = require('./src/Ramp')
const Exporter = require('./src/Exporter')

const c = new Color('3b944b')
const r = new MidpointRamp(9, c)

r.hueStepSize = 15
r.saturationStepSize = 8
r.valueStepSize = 10
r.reverseHue = true
r.apply()

r.elements.forEach(el => console.log(el.hsv)) // Debug

const e = new Exporter(32, r, 'output.png')
e.exportPNG()