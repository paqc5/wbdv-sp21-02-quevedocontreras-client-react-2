import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ModuleList from './module-list';
import LessonTabs from './lesson-tabs';
import TopicPills from './topic-pills';
import courseService from '../../services/course-service'
import WidgetList from '../widgets/widget-list';

const CourseEditor = (
  {
    history
  }) => {

  const { layout, courseId } = useParams()
  const [courseTitle, setCourseTitle] = useState()

  const findCourse = (id) =>
    courseService.findCourse(id)
      .then(response => setCourseTitle(response.title))

  useEffect(() => {
    findCourse(courseId)
  }, [courseId])

  return (
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
            <WidgetList />
          </div>
        </div>
      </div>
    </div>
  )
}
export default CourseEditor