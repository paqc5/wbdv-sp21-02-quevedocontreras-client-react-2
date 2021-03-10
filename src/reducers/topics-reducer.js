const initialState = {
  topics: []
}

const topicReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FIND_TOPICS_FOR_LESSON':
      return {
        ...state.topics,
        topics: action.topics
      }

    case "CREATE_TOPIC":
      return {
        topics: [
          ...state.topics,
          action.newTopic
        ]
      }

    case "DELETE_TOPIC":
      return {
        topics:
          state.topics.filter(topic => {
            if (topic._id === action.topicToDelete._id) {
              return false
            }
            return true
          })
      }

    case "UPDATE_TOPIC":
      return {
        topics: state.topics.map(topic => {
          if (topic._id === action.topicToUpdate._id) {
            return action.topicToUpdate
          }
          return topic
        })
      }
    default:
      return state
  }
}

export default topicReducer