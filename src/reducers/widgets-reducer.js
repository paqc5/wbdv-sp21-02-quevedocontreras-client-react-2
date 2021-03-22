const initialState = {
  widgets: []
}

const widgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FIND_ALL_WIDGETS_FOR_TOPIC":
      return {
        ...state.widgets,
        widgets: action.allWidgets
      }
    case "CREATE_WIDGET":
      return {
        widgets: [
          ...state.widgets,
          action.newWidget
        ]
      }
    case "UPDATE_WIDGET":
      return {
        widgets: state.widgets.map(widget => {
          if(widget.id === action.widgetToUpdate.id) {
            return action.widgetToUpdate
          }
          return widget
        })
      }
    case "DELETE_WIDGET":
      return {
        widgets: state.widgets.filter(widget => {
          if(widget.id === action.widgetToDelete) {
            return false
          }
          return true
        })
      }
    default:
      return state
  }
}
export default widgetReducer