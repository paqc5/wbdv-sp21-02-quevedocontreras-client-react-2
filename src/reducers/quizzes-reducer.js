const initialState = {
  quizzes: [],
  score: 0
}

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FIND_ALL_QUIZZES':
      return {
        ...state.quizzes,
        quizzes: action.allQuizzes
      }
    default:
      return state
  }
}

export default quizReducer