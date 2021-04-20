import quizAttemptsService from '../services/quiz-attempts-service'

export const submitQuiz = (dispatch, quizId, answers) => {
  quizAttemptsService.submitQuiz(quizId, answers)
      .then(response => {
            dispatch({type: "GRADED_QUIZ", score: response.score})
          }
      )
}

const quizAttemptsActions = {
    submitQuiz
}

export default quizAttemptsActions