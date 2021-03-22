const LESSONS_URL = "https://wbdv-generic-server.herokuapp.com/api/quevedocontrerasp/lessons"
const TOPICS_URL = "https://wbdv-generic-server.herokuapp.com/api/quevedocontrerasp/topics"


export const findTopicsForLesson = (lessonId) => {
  return(
    fetch(`${LESSONS_URL}/${lessonId}/topics`)
      .then(response => response.json())
  )
}

export const createTopic = (lessonId, topic) => {
  return(
    fetch(`${LESSONS_URL}/${lessonId}/topics`, 
    {
      method: 'POST',
      body: JSON.stringify(topic),
      headers: {'content-type': 'application/json'}
    }).then(response => response.json())
  )
}

export const updateTopic = (topicId, topic) => {
  return(
    fetch(`${TOPICS_URL}/${topicId}`, 
    {
      method: 'PUT',
      body: JSON.stringify(topic),
      headers: {'content-type': 'application/json'}
    }).then(response => response.json())
  )
}

export const deleteTopic = (topicId) => {
  return(
    fetch(`${TOPICS_URL}/${topicId}`, {method: 'DELETE'})
      .then(response => response.json())
  )
}

const api = {
  findTopicsForLesson,
  createTopic,
  updateTopic,
  deleteTopic
}
export default api