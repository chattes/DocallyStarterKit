import Logger from './Logger'
import $ from 'jquery'

import config from '../utilities/utils'

const R = require('ramda')

const BASE_URL = config().host

const SendToken = ({ loginDetails, source, initState }) => {
  Logger(`Send Token is being called from ... ${source}`)
  let fcmToken = window.localStorage.getItem('FCMToken')
  Logger({
    text: `Token from Local Storage is: ${fcmToken}`
  })
  if (fcmToken && fcmToken !== '') {
    let deviceLink = null
    deviceLink = loginDetails.hasIn([
      'userLoaded',
      'attributes',
      'links',
      'device-token'
    ])
      ? loginDetails.getIn([
          'userLoaded',
          'attributes',
          'links',
          'device-token'
        ])
      : Logger({
          text: 'URL to send token does not exist. Create URL...'
        })
    let userId = loginDetails.hasIn(['userLoaded', 'id'])
      ? loginDetails.getIn(['userLoaded', 'id'])
      : null
    if (!userId) {
      Logger({
        text: 'User not yet loaded.. Token will not be sent'
      })
    }
    if (!deviceLink && userId) {
      deviceLink = `${BASE_URL}/users/${userId}/devices_create`
    }

    let auth_key = loginDetails.get('auth_token')
    if (deviceLink) {
      Logger({
        text: `Sending FCM token for user: ${deviceLink} and DeviceId: ${
          window.device.uuid
        } running Version: ${window.device.version}`
      })
      return $.ajax({
        method: 'POST',
        url: deviceLink,
        headers: {
          Authorization: auth_key
        },
        data: {
          token: fcmToken,
          device_type: window.device.platform,
          device_id: window.device ? window.device.uuid : null,
          playstore_ver: window.localStorage.getItem('AppVersion'),
          os_name: window.device ? window.device.version : ''
        },
        // processData: false,
        // contentType: false,
        // crossDomain: true,
        // mimeType: 'multipart/form-data',
        success: function(payload) {
          Logger({
            text: 'Yay! Token Sent Succesfully!'
          })
        },
        error: function(error) {
          Logger({
            text: error.statusText
          })
          if (error.status == 401) {
            Logger({
              text: 'Login expired..show login screen'
            })
            initState()
          }
        }
      })
    }
  } else {
    Logger({
      text: 'Token not found in Local Storage'
    })
  }
}

export default SendToken
