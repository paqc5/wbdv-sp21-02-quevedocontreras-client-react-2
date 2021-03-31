import widgetService from '../services/widget-service'

export const findWidgetsForTopic = (dispatch, topicId) =>
  widgetService.findWidgetsForTopic(topicId)
    .then(response =>
      dispatch({ type: "FIND_ALL_WIDGETS_FOR_TOPIC", allWidgets: response })
    )

export const createWidget = (dispatch, topicId, newWidgetType) => {

  let widgetType;
  if(newWidgetType === "") {
    widgetType= "HEADING"
  } else {
    widgetType= newWidgetType
  }

  const newWidget = {
    type: widgetType,
    size: 1,
    text: "Default Widget Text",
    src: "https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png",
    ordered: 0
  }

  widgetService.createWidget(topicId, newWidget)
    .then(response =>
      dispatch({ type: "CREATE_WIDGET", newWidget: response })
    )
}
  
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