const API_URL = process.env.REACT_APP_QUIZZES_URL
// const API_URL = "http://localhost:4000/api/quizzes"

const findQuestionsForQuiz = (quizId) => {
  return fetch(`${API_URL}/${quizId}/questions`)
    .then(response => response.json())
}

export default {
  findQuestionsForQuiz
}