const API_URL = process.env.REACT_APP_QUIZZES_URL
// const API_URL = "http://localhost:4000/api/quizzes"

const findAllQuizzes = () => {
  return fetch(`${API_URL}`)
    .then(response => response.json())
}

const findQuizById = (quizId) => {
  return fetch(`${API_URL}/${quizId}`)
    .then(response => response.json())
}

const  api = {
  findAllQuizzes,
  findQuizById
}
export default api