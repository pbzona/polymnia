class Util {
  static getAngularDistance(current, target) {
    const phi = Math.abs(target - current) % 360
    const distance = phi > 180 ? 360 - phi : phi
    return distance
  }
}

module.exports = Util