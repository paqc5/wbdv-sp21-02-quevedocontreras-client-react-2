const initialState = {
  score: 0
}

const quizAttemptsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GRADED_QUIZ':
      return {
        score: action.score
      }
    default:
      return state
  }
}

export default quizAttemptsReducer