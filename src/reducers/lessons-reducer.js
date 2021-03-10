const initialState = {
  lessons: []
}

const lessonReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FIND_LESSONS_FOR_MODULE':
      return {
        ...state.lessons,
        lessons: action.lessons
      }
      
    case "CREATE_LESSON":
      return {
        lessons: [
          ...state.lessons,
          action.newLesson
        ]
      }

    case "DELETE_LESSON":
      return {
        lessons:
          state.lessons.filter(lesson => {
            if (lesson._id === action.lessonToDelete._id) {
              return false
            }
            return true
          })
      }

    case "UPDATE_LESSON":
      return {
        lessons: state.lessons.map(lesson => {
          if (lesson._id === action.lessonToUpdate._id) {
            return action.lessonToUpdate
          } else {
            return lesson
          }
        })
      }
    default:
      return state
  }
}

export default lessonReducer