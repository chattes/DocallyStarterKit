import config from '../utilities/utils'

export const Constants = {
  CONFERENCE_BASE: config().port
    ? `http://${config().host}:${config().port}/conferences`
    : `${config().host}/conferences`,
  TT: 'TUTU'
}
