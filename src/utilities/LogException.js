import SourceMappedStackTrace from 'sourcemapped-stacktrace'
import { hashHistory } from 'react-router'
import Config from '../utilities/utils'

const webHookSlack =
  'https://hooks.slack.com/services/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'
const webHookProd =
  'https://hooks.slack.com/services/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'

const LogException = (ex, context) => {
  if (window.cordova) {
    let hook = Config().host.includes('linode') ? webHookSlack : webHookProd
    SourceMappedStackTrace.mapStackTrace(
      ex.stack,
      mappedStack => {
        mappedStack.unshift(ex.message)
        mappedStack = mappedStack.slice(0, 5)
        fetch(hook, {
          method: 'POST',
          body: JSON.stringify({
            text: mappedStack.join('\n')
          })
        })
          .then(response => hashHistory.push('/error'))
          .catch(err => {
            console.log(err)
            hashHistory.push('/error')
          })
      },
      {}
    )
  } else {
    throw ex
  }
}

export default LogException
