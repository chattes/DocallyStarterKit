import Logger from '../utilities/Logger'
import Config from '../utilities/utils'
const FCMTokenRegister = callback => {
  // Push Notification Integration test
  console.log(window.FCMPlugin)
  //FCMPlugin.onTokenRefresh( onTokenRefreshCallback(token) );
  //Note that this callback will be fired everytime a new token is generated, including the first time.
  window.FCMPlugin.onTokenRefresh(function(token) {
    // alert(token)
    // alert('token refreshed')

    window.localStorage.setItem('FCMToken', token)
    Logger({
      text: `Token has been refreshed from FCM for Device:${
        window.device ? window.device.uuid : 'No device'
      }`
    })
    callback()
  })
  window.FCMPlugin.getToken(token => {
    // alert('Got Token')
    let appType = Config().host.includes('linode')
      ? 'TEST APP'
      : 'PRODUCTION APP'
    window.localStorage.setItem('FCMToken', token)
    Logger({
      text: `${appType} : Got token from FCM for Device ${
        window.device ? window.device.uuid : 'No device'
      }`
    })
    callback()
  })
}

export default FCMTokenRegister
