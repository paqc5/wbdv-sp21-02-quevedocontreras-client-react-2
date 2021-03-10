const MODULES_URL = "https://wbdv-generic-server.herokuapp.com/api/quevedocontrerasp/modules"
const LESSONS_URL = "https://wbdv-generic-server.herokuapp.com/api/quevedocontrerasp/lessons"

export const findLessonsForModule = (moduleId) => {
  return(
    fetch(`${MODULES_URL}/${moduleId}/lessons`)
      .then(response => response.json())
  )
}

export const createLesson = (moduleId, lesson) => {
  return(
    fetch(`${MODULES_URL}/${moduleId}/lessons`,
    { 
      method: 'POST',
      body: JSON.stringify(lesson),
      headers: { 'content-type': 'application/json'}
    }).then((response) => response.json())
  )
}

export const updateLesson = (lessonId, lesson) => {
  return(
    fetch(`${LESSONS_URL}/${lessonId}`, 
    {
      method: 'PUT',
      body: JSON.stringify(lesson),
      headers: {'content-type': 'application/json'}
    }).then(response => response.json())
  )
}

export const deleteLesson = (lessonId) => {
  return(
    fetch(`${LESSONS_URL}/${lessonId}`, {method: 'DELETE'})
      .then(response => response.json())
  )
}

const api = {
  findLessonsForModule,
  createLesson,
  updateLesson,
  deleteLesson
}
export default api