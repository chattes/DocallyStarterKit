const fileReadSuccess = (e, callback, imageURI) => {
  console.log(e)
  e.file(f => {
    let reader = new FileReader()
    reader.onloadend = e => {
      let imgBlob = new Blob([e.target.result], { type: 'image/jpeg' })
      imgBlob.name = 'image.jpg'
      console.log(`Blob Created: ${imgBlob}`)
      callback(imgBlob, null, imageURI)
    }
    reader.readAsArrayBuffer(f)
  })
}
const fileReadFailure = (e, callback, imageURI) => {
  console.log('Cannot read file')
  callback(null, true, imageURI)
}
const EncodeImage = (imageURI, callback, blob) => {
  // window.resolveLocalFileSystemURL(
  //   imageURI,
  //   e => fileReadSuccess(e, callback, imageURI),
  //   e => fileReadFailure(e, callback, imageURI))
  let c = document.createElement('canvas')
  let ctx = c.getContext('2d')
  var img = new Image()
  img.onload = function() {
    c.width = this.width
    c.height = this.height
    ctx.drawImage(img, 0, 0)
    if (blob) {
      c.toBlob(blob => callback(blob, null, imageURI), 'image/jpeg', 0.8)
    } else {
      let dataURL = c.toDataURL('image/jpeg', 0.7)
      callback(dataURL, null, imageURI)
    }
  }
  img.src = imageURI
}

export default EncodeImage
