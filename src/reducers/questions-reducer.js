const initialState = {
  questions: []
}

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FIND_QUESTIONS_FOR_QUIZ':
      return {
        questions: action.allQuestions
      }
    default:
      return state
  }
}

export default questionReducer