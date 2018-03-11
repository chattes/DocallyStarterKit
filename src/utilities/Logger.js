import Config from '../utilities/utils'

import $ from 'jquery'
const IsProd = () => Config().host.includes('api.docally')
const webHookSlack =
  'https://hooks.slack.com/services/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'
const Logger = payload => {
  if (window.cordova) {
    console.log(payload.text)
    // $.ajax({
    //   method: 'POST',
    //   url: webHookSlack,
    //   data: {
    // 									text: payload.text
    // 					}
    //   ,
    //   contentType: 'application/json',
    //   success: function(payload) {
    // 					console.log(payload)
    //   },
    //   error: function(error) {
    // 					console.log(error)
    //   }
    // })
  } else {
    console.log(payload)
  }
}

export default Logger
