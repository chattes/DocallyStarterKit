import { fetchPosts, initState } from '../actions'
import Store from '../reducers/store'
import SendToken from '../utilities/SendFCMToken'

const FCMTokenSend = () => {
  let state = Store.getState()

  const initializeState = () => {
    Store.dispatch(initState())
  }

  SendToken({
    loginDetails: state.get('loginDetails'),
    source: 'APP_RESUMED',
    initState: initializeState
  })
}

export default FCMTokenSend
