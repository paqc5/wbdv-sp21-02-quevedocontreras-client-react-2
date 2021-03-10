import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import moduleReducer from '../reducers/modules-reducer';
import lessonReducer from '../reducers/lessons-reducer';
import topicReducer from '../reducers/topics-reducer';
import ModuleList from './module-list';
import LessonTabs from './lesson-tabs';
import TopicPills from './topic-pills';
import courseService from '../services/course-service'


const reducer = combineReducers({
  moduleReducer: moduleReducer,
  lessonReducer: lessonReducer,
  topicReducer: topicReducer
})
// const store = createStore(moduleReducer)
const store = createStore(reducer)

const CourseEditor = (
  {
    history
  }) => {

  const { layout, courseId } = useParams() 
  const[courseTitle, setCourseTitle] = useState()

  const findCourse = (id) =>
    courseService.findCourse(id)
      .then(response => setCourseTitle(response.title))

  useEffect(() => {
    findCourse(courseId)
  }, [courseId])

  return (
    <Provider store={store}>
      <div className="paqc-course-editor-container">
        <div className="paqc-course-editor-title row">
          {/* <button onClick={() => history.goBack()}>
            <i className="fas fa-chevron-left fa-lg"></i>
          </button> */}
          <Link to={`/courses/${layout}`}>
            <i className="fas fa-chevron-left fa-lg"></i>
          </Link>
          <h4>{courseTitle}</h4>
        </div>
        <div className="paqc-course-content-container row">
          <div className="paqc-modules-navbar col-5 col-md-3">
            <ModuleList />
          </div>
          <div className="col-7 col-md-9 pl-2">
            <LessonTabs />
            <div className="paqc-course-lesson-content">
              <TopicPills />
              <div className="paqc-course-topic-content">
                Some content
              </div>
            </div>
          </div>
        </div>
      </div>
    </Provider>)
}
export default CourseEditor