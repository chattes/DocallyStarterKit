import { hashHistory } from 'react-router'
import { reloadTopicComments } from '../actions'
import { reloadConferenceDiscussionDet } from '../actions/ConferenceActions'
import Store from '../reducers/store'

const R = require('ramda')

const RouteNotification = ({ notification }) => {
  switch (notification.object_type) {
    case 'conference_discussion':
      if (R.isNil(notification.discussion_id)) {
        hashHistory.push(
          `conferences/conference/${notification.conference_id}/discussions`
        )
      } else {
        hashHistory.push(
          `conferences/conference/${notification.conference_id}/discussions/${
            notification.discussion_id
          }`
        )
        Store.dispatch(
          reloadConferenceDiscussionDet({
            confId: notification.conference_id,
            confDiscId: notification.discussion_id
          })
        )
      }
      return
    case 'conference_anouncement':
      hashHistory.push(
        `conferences/conference/${parseInt(
          notification.conference_id
        )}/announcements/${parseInt(notification.anouncement_id)}`
      )
      return
    case 'community_topic':
      if (R.isNil(notification.topic_id)) {
        hashHistory.push(`communities/community/${notification.community_id}`)
      } else {
        hashHistory.push(
          `communities/community/${notification.community_id}/topic/${
            notification.topic_id
          }`
        )
        Store.dispatch(
          reloadTopicComments({
            communityId: notification.community_id,
            topicId: notification.topic_id
          })
        )
      }
      return
    default:
      hashHistory.push('/')
  }
}

export default RouteNotification
