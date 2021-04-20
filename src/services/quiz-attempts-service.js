const API_URL = process.env.REACT_APP_QUIZZES_URL

const findAttemptsForQuiz = (quizId) =>
    fetch(`${API_URL}/${quizId}/attempts`)
        .then(response => response.json())

const submitQuiz = (quizId, answers) => {
  let rs = Object.values(answers)
  return fetch(`${API_URL}/${quizId}/attempts`,
      {
        method: 'POST',
        body: JSON.stringify(rs),
        headers: {'content-type': 'application/json'}
      }).then(response => response.json())
}

const api = {
    findAttemptsForQuiz,
    submitQuiz
}

export default api