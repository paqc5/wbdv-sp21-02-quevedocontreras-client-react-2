import React, {useEffect, useState} from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import EditableItem from './editable-item';
import lessonService from '../../services/lesson-service'
// import topicService, { findTopicsForLesson } from '../services/topic-service';


const LessonTabs = (
  {
    lessons = [],
    createLesson,
    deleteLesson,
    updateLesson,
    findLessonsForModule

  }) => {

  const { layout, courseId, moduleId, lessonId } = useParams()
  const [redirectLesson, setRedirectLesson] = useState(false)

  useEffect(() => {
    findLessonsForModule(moduleId)
    if(lessonId === "undefined" || typeof lessonId === "undefined") {
      setRedirectLesson(true)
    }
  }, [findLessonsForModule, moduleId, lessonId])

  return (
    <ul className="nav nav-tabs">
      {redirectLesson && lessons.length !== 0 ?
        <Redirect to={`/courses/${layout}/edit/${courseId}/modules/${moduleId}/lessons/${lessons[0]._id}`} /> : ''}
      {
        lessons.map(lesson =>
          <li key={lesson._id} className="nav-item">
            <EditableItem 
              to={`/courses/${layout}/edit/${courseId}/modules/${moduleId}/lessons/${lesson._id}`}
              item={lesson}
              deleteItem={deleteLesson}
              updateItem={updateLesson}
              itemClass={`nav-link ${lessonId === lesson._id ? 'active' : ''}`} />
          </li>)
      }
      <li className="nav-item">
        <button className="nav-link" onClick={() => createLesson(moduleId)}>
          <i className="fas fa-plus-circle p-0"></i>
        </button>
      </li>
    </ul>
  )
}

const stateToPropertyMapper = (state) => {
  return {
    lessons: state.lessonReducer.lessons
  }
}

const dispatchToPropertyMapper = (dispatch) => {
  return {
    findLessonsForModule: (item) => {
      lessonService.findLessonsForModule(item)
        .then(response => 
          dispatch({type: 'FIND_LESSONS_FOR_MODULE', lessons: response}))
    },
    createLesson: (item) => {
      if (item !== "undefined" && typeof item !== "undefined") {
        lessonService.createLesson(item, { title: 'New Lesson' })
          .then(response =>
            dispatch({ type: 'CREATE_LESSON', newLesson: response }))
      } else {
        alert("You have to specified the module for this lesson.")
      }
    },
    deleteLesson: (item) => {
      lessonService.deleteLesson(item._id)
        .then(response => {
          dispatch({ type: 'DELETE_LESSON', lessonToDelete: item })
        })
    },
    
    updateLesson: (item) => {
      lessonService.updateLesson(item._id, item)
        .then(response => 
          dispatch({ type: 'UPDATE_LESSON', lessonToUpdate: item }))
    }
  }
}

export default connect(stateToPropertyMapper, dispatchToPropertyMapper)(LessonTabs)