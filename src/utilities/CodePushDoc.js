import { persistStore, autoRehydrate } from 'redux-persist-immutable'
import Store from '../reducers/store'
import Logger from '../utilities/Logger'

const Message = 'Updates Have been Succesfully Installed.'
const CodePushDoc = () => {
  console.log('Checking Code push...')
  console.log(window.codePush)
  if (window.codePush) {
    window.codePush.sync(
      syncStatus => {
        switch (syncStatus) {
          case window.SyncStatus.CHECKING_FOR_UPDATE:
            // displayMessage('Checking for Updates...')
            console.log('Checking Updates...')
            break
          case window.SyncStatus.INSTALLING_UPDATE:
            console.log('Installing Updates...')
            // displayMessage('Installing Updates')
            // window.cordova.plugin.pDialog.init({
            //   theme: 'HOLO_DARK',
            //   progressStyle: 'SPINNER',
            //   cancelable: false,
            //   title: 'Installing Updates',
            //   message: 'Please wait...'
            // })
            break
          case window.SyncStatus.UPDATE_INSTALLED:
            console.log('Updates Installed Sucesfully!')
          // window.cordova.plugin.pDialog.dismiss()
          // Clean Up
          // persistStore(Store, {}, () => {
          //   Logger({
          //     text: 'Offline Storage has been purged after a Code Update'
          //   })
          //   // window.location.reload(true)
          //   // navigator.notification.alert(Message, 'Information', 'OK')
          // }).purge
        }
      },
      { installMode: window.InstallMode.ON_NEXT_RESUME, updateDialog: false }
    )
  }
}

export default CodePushDoc
