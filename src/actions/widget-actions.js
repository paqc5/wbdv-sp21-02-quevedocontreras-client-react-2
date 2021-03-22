import widgetService from '../services/widget-service'

export const findWidgetsForTopic = (dispatch, topicId) =>
  widgetService.findWidgetsForTopic(topicId)
    .then(response =>
      dispatch({ type: "FIND_ALL_WIDGETS_FOR_TOPIC", allWidgets: response })
    )

export const createWidget = (dispatch, topicId) =>
  widgetService.createWidget(topicId,
    {
      type: "HEADING",
      size: 1,
      text: "Default Heading Widget"
    }
  )
    .then(response =>
      dispatch({ type: "CREATE_WIDGET", newWidget: response })
    )
export const updateWidget = (dispatch, widgetId, widget) =>
  widgetService.updateWidget(widgetId, widget)
    .then(response =>
      dispatch({ type: "UPDATE_WIDGET", widgetToUpdate: widget })
    )
export const deleteWidget = (dispatch, widgetId) =>
  widgetService.deleteWidget(widgetId)
    .then(response => dispatch({ type: "DELETE_WIDGET", widgetToDelete: widgetId }))

const widgetActions = {
  createWidget,
  updateWidget,
  deleteWidget,
  findWidgetsForTopic
}

export default widgetActions