const API_URL = "http://localhost:8080/api"

export const createWidget = (topicId, widget) => {
  return (
    fetch(`${API_URL}/topics/${topicId}/widgets`, 
    {
      method: 'POST',
      body: JSON.stringify(widget),
      headers: {'content-type': 'application/json'}
    }).then((response) => response.json())
  )
}

export const findWidgetsForTopic = (topicId) => {
  return(
    fetch(`${API_URL}/topics/${topicId}/widgets`)
      .then((response) => response.json())
  )
}

export const findAllWidgets = () => {
  return(
    fetch(`${API_URL}/widgets`)
      .then((response) => response.json())
  )
}

export const findWidgetById = (widgetId) => {

}

export const updateWidget = (widgetId, widget) => {
  return(
    fetch(`${API_URL}/widgets/${widgetId}`,
    {
      method: 'PUT',
      body: JSON.stringify(widget),
      headers: {'content-type': 'application/json'}
    }).then(response => response.json())
  )
}

export const deleteWidget = (widgetId) => {
  return(
    fetch(`${API_URL}/widgets/${widgetId}`, {method: 'DELETE'})
      .then((response) => response.json())
  )
}

const api = {
  createWidget,
  findWidgetsForTopic,
  findAllWidgets,
  findWidgetById,
  updateWidget,
  deleteWidget
}
export default api