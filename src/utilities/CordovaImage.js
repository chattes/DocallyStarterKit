import EncodeImage from './EncodeImage'
const CordovaImage = (callback, crop, blob) => {
  if (!navigator.camera) {
    return callback(null, 'Cannot Process Image')
  }
  const options = {
    quality: 60,
    destinationType: window.Camera.DestinationType.FILE_URI,
    sourceType: window.Camera.PictureSourceType.PHOTOLIBRARY,
    allowEdit: !crop,
    encodingType: window.Camera.EncodingType.JPEG,
    correctOrientation: true,
    saveToPhotoAlbum: false
    // targetWidth: '100%',
    // targetHeight: window.innerHeight*.25
  }
  navigator.camera.getPicture(
    function(imageData) {
      if (window.plugins.crop && crop) {
        window.plugins.crop
          .promise(imageData, { quality: 100 })
          .then(data => {
            console.log(data)
            EncodeImage(data, callback, blob)
          })
          .catch(err => callback(null, err))
      } else {
        // let image = `data:image/jpeg;base64,${imageData}`
        console.log(imageData)
        EncodeImage(imageData, callback, blob)
      }
    },
    function(err) {
      callback(null, err)
    },
    options
  )
}

export default CordovaImage
