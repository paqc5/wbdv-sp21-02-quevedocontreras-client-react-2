import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import EditableItem from './editable-item';
import moduleService from '../services/module-service'

const ModuleList = (
  {
    modules = [],
    createModule,
    deleteModule,
    updateModule,
    findModulesForCourse

  }) => {

  const { layout, courseId, moduleId } = useParams()
  const [redirectModule, setRedirectModule] = useState(false)

  useEffect(() => {
    findModulesForCourse(courseId)
    if(moduleId === "undefined" || typeof moduleId === "undefined") {
      setRedirectModule(true)
    }
  }, [findModulesForCourse, courseId, moduleId, redirectModule])

return (
  
  <div className="list-group">
    {redirectModule && modules.length !== 0 ? 
      <Redirect to={`/courses/${layout}/edit/${courseId}/modules/${modules[0]._id}`} /> : ''}
    {
      modules.map(module =>
        <EditableItem
          to={`/courses/${layout}/edit/${courseId}/modules/${module._id}`}
          key={module._id}
          item={module}
          deleteItem={deleteModule}
          updateItem={updateModule}
          itemClass={`list-group-item list-group-item-action 
                ${moduleId === module._id ? 'active' : ''}`}
        />
      )
    }
    <button onClick={() => createModule(courseId)}
      className="list-group-item list-group-item-action">
      Add Module <i className="fas fa-plus-circle"></i>
    </button>
  </div>
)}

const stateToPropertyMapper = (state) => {
  return {
    modules: state.moduleReducer.modules
  }
}

const dispatchToPropertyMapper = (dispatch) => {
  return {
    createModule: (item) => {
      moduleService.createModule(item, { title: 'New Module' })
        .then(response =>
          dispatch({ type: 'CREATE_MODULE', newModule: response }))
    },
    deleteModule: (item) => {
      moduleService.deleteModule(item._id)
        .then(response =>
          dispatch({ type: 'DELETE_MODULE', moduleToDelete: item }))
    },
    updateModule: (item) => {
      moduleService.updateModule(item._id, item)
        .then(response =>
          dispatch({ type: 'UPDATE_MODULE', moduleToUpdate: item }
          ))
    },
    findModulesForCourse: (item) =>
      moduleService.findModulesForCourse(item)
        .then(response =>
          dispatch({ type: 'FIND_MODULES_FOR_COURSE', modules: response }))
  }
}
export default connect(stateToPropertyMapper, dispatchToPropertyMapper)(ModuleList)