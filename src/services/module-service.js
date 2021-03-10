const COURSES_URL = "https://wbdv-generic-server.herokuapp.com/api/quevedocontrerasp/courses"
const MODULES_URL = "https://wbdv-generic-server.herokuapp.com/api/quevedocontrerasp/modules"

export const findModulesForCourse = (courseId) => {
  return(
    fetch(`${COURSES_URL}/${courseId}/modules`)
      .then(response => response.json())
  )
}

export const createModule = (courseId, module) => {
  return(
    fetch(`${COURSES_URL}/${courseId}/modules`, 
      {
        method: 'POST',
        body: JSON.stringify(module),
        headers: {'content-type': 'application/json'}
      }).then(response => response.json())
  )
}

export const updateModule = (moduleId, module) => {
  return(
    fetch(`${MODULES_URL}/${moduleId}`, 
    {
      method: 'PUT',
      body: JSON.stringify(module),
      headers: {'content-type': 'application/json'}
    }).then(response => response.json())
  )
}

export const deleteModule = (moduleId) => {
  return(
    fetch(`${MODULES_URL}/${moduleId}`,
    {method: 'DELETE'}).then(response => response.json())
  )
}

const api = {
  findModulesForCourse,
  createModule,
  updateModule,
  deleteModule
}
export default api