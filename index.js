const Color = require('./src/color/Color')
const LinearRamp = require('./src/ramp/LinearRamp')
const MidpointRamp = require('./src/ramp/MidpointRamp')
const Exporter = require('./src/Exporter')

// MidpointRamp example
const b = new Color('2189cf')
const m = new MidpointRamp(9, b)
m.hueStepSize = 15
m.saturationStepSize = 10
m.valueStepSize = 10
m.reverseHueShift = true
m.apply()

m.elements.forEach(el => console.log(el._hsv))

const e = new Exporter(32, m, 'output.png')
e.exportPNG()

// LinearRamp example
const c = new Color('c4c278')
const d = new Color('6e3623')
const l = new LinearRamp(6, c, d)
l.apply()

l.elements.forEach(el => console.log(el._hsv))

const f = new Exporter(32, l, 'output_linear.png')
f.exportPNG()
