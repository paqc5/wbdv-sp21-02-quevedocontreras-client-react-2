const initialState = {
  modules: []
}

const moduleReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FIND_MODULES_FOR_COURSE':
      return {
        ...state,
        modules: action.modules
      }
    case "CREATE_MODULE":
      return {
        modules: [
          ...state.modules,
          action.newModule
        ]
      }

    case "DELETE_MODULE":
      return {
        modules: 
          state.modules.filter(module => {
            if(module._id === action.moduleToDelete._id){
              return false
            } 
            return true
          })
      }
      
    case "UPDATE_MODULE":
      return {
        modules: state.modules.map(module => {
          if(module._id === action.moduleToUpdate._id) {
            return action.moduleToUpdate
          } else {
            return module
          }
        })
      }
    default:
      return state
  }
}

export default moduleReducer