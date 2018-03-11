var hasWebP = false

const CheckWebP = callBack => {
  let img = new Image()
  img.onload = () => {
    hasWebP = !!(img.height > 0 && img.width > 0)
    callBack(hasWebP)
  }

  img.onerror = () => {
    callBack(false)
  }
  img.src = require('../Assets/Images/testwebp.webp')
}

export default CheckWebP
