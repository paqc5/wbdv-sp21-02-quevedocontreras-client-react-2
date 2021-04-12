import quizService from '../services/quiz-service'

export const findAllQuizzes = (dispatch) =>
  quizService.findAllQuizzes()
    .then(response =>
      dispatch({ type: "FIND_ALL_QUIZZES", allQuizzes: response })
    )

const quizActions = {
  findAllQuizzes
}

export default quizActions