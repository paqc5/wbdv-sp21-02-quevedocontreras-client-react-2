import questionService from '../services/question-service'

export const findQuestionsForQuiz = (dispatch, quizId) =>
  questionService.findQuestionsForQuiz(quizId)
    .then(response =>
      dispatch({ type: "FIND_QUESTIONS_FOR_QUIZ", allQuestions: response })
    )

const questionsActions = {
  findQuestionsForQuiz
}

export default questionsActions