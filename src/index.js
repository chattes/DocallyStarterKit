import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Store from './reducers/store'
import { persistStore, autoRehydrate } from 'redux-persist-immutable'
import thunk from 'redux-thunk'
import reducer from './reducers'
import Main from './containers/Main'
import Home from './containers/Home'
import 'bootstrap/dist/css/bootstrap.css'
import './css/app.css'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import ReactUpdates from 'react-dom/lib/ReactUpdates'
import ReactDefaultBatchingStrategy from 'react-dom/lib/ReactDefaultBatchingStrategy'
import LogException from './utilities/LogException'
import registerServiceWorker from './registerServiceWorker'
import Logger from './utilities/Logger'
import Config from './utilities/utils'
import CodePushDoc from './utilities/CodePushDoc'
import FCMTokenRegister from './utilities/FCMTokenRegister'
import FCMTokenSend from './utilities/FCMTokenSend'
import DocallyRoutes from './routes'
let isHandlingError = false
let initialHref = null

const AppResumed = () => {
  // Check for Updates
  CodePushDoc()
  FCMTokenRegister(FCMTokenSend)
}

// Handles All UI Errors Centrally and forwards to Slack Channel #CordovaAppErrors
const ReactTryCatchBatchingStrategy = {
  // this is part of the BatchingStrategy API. simply pass along
  // what the default batching strategy would do.
  get isBatchingUpdates() {
    return ReactDefaultBatchingStrategy.isBatchingUpdates
  },

  batchedUpdates(...args) {
    try {
      ReactDefaultBatchingStrategy.batchedUpdates(...args)
    } catch (e) {
      if (isHandlingError) {
        // our error handling code threw an error. just throw now
        throw e
      }

      isHandlingError = true
      try {
        // replace this with whatever error handling logic you like.
        // e.g. dispatch redux action notifying the app that an error occurred:
        // `store.dispatch({type: "EXCEPTION", payload: e});`
        LogException(e)
        // persistStore(Store).purge
      } finally {
        isHandlingError = false
      }
    }
  }
}

const startApp = () => {
  // const muiTheme = getMuiTheme(darkBaseTheme)
  if (window.cordova && window.cordova.plugins.Keyboard) {
    // window.cordova.plugins.Keyboard.disableScroll(true)
    window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false)
  }
  const muiTheme = getMuiTheme()
  injectTapEventPlugin()
  // const middleware = [thunk]
  // const store = createStore(reducer, compose(applyMiddleware(...middleware), autoRehydrate()))
  // persistStore(store)

  // Error Reporting
  ReactUpdates.injection.injectBatchingStrategy(ReactTryCatchBatchingStrategy)
  // Render APP

  ReactDOM.render(
    <Provider store={Store}>
      <MuiThemeProvider muiTheme={muiTheme}>
      <DocallyRoutes />
     </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
  )
  registerServiceWorker()
}

const startAppCordova = () => {
  // Get App Version
  if (window.cordova.getAppVersion) {
    window.cordova.getAppVersion.getVersionNumber(version => {
      console.log(`Version: ${version}`)
      window.localStorage.setItem('AppVersion', version)

      if (
        version < Config().playVersion &&
        window.device.platform === 'Android'
      ) {
        navigator.notification.confirm(
          'Would you like to Update your App now ?',
          function(index) {
            if (index == 1) {
              console.log('Playstore')
              if (Config().host.includes('linode')) {
                window.location.replace(
                  'market://details?id=in.plasthub.backend'
                )
              } else {
                window.location.replace(
                  'market://details?id=in.plasthub.docally'
                )
              }
            }
          },
          'Update Available',
          ['Yes', 'Later']
        )
      }
    })
  }

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
  })
  window.FCMPlugin.getToken(token => {
    let appType = Config().host.includes('linode')
      ? 'TEST APP'
      : 'PRODUCTION APP'
    window.localStorage.setItem('FCMToken', token)
    Logger({
      text: `${appType} : Got token from FCM for Device ${
        window.device ? window.device.uuid : 'No device'
      }`
    })
  })
  initialHref = window.location.href

  startApp()
  // Check App Updates
  CodePushDoc()
  document.addEventListener('resume', AppResumed, false)
}
if (!window.cordova) {
  startApp()
} else {
  document.addEventListener('deviceready', startAppCordova, false)
}
