const GetPlatform = () => {
  if (window.device) {
    return window.device.platform
  } else {
    return 'WEB'
  }
}

export default GetPlatform
