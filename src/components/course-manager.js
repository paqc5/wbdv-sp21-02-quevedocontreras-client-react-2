import React from 'react';
import { Route } from 'react-router-dom';
import courseService from '../services/course-service';
import CourseEditor from './course-editor';
import CourseGrid from './course-grid';
import CourseTable from './course-table';

class CourseManager extends React.Component {

  state = {
    courses: []
  }

  componentDidMount = () =>
    courseService.findAllCourses().then(courses => this.setState({ courses }))

  addCourse = (newCourseTitle) => {

    const date = new Date();
    const newCourse = {
      title: newCourseTitle,
      owner: "me",
      lastModified: 
        date.getMonth().toString() + "/" + date.getDay().toString() + "/" + date.getFullYear().toString(),
      description: "Some course description here"
    }

    courseService.createCourse(newCourse)
      .then(course => this.setState(
        (prevState) => ({
          ...prevState,
          courses: [...prevState.courses, course]
      })))
  }

  deleteCourse = (courseIdToDelete) =>
    courseService.deleteCourse(courseIdToDelete)
      .then(response => {
        this.setState(prevState => {
          let nextState = { ...prevState }
          nextState.courses = prevState.courses
            .filter(course => course._id !== courseIdToDelete)
          return nextState
        })
      })

  updateCourse = (updatedCourse) => {
    courseService.updateCourse(updatedCourse._id, updatedCourse)
      .then(status => this.setState((prevState) => ({
        ...prevState,
        courses: prevState.courses.map(
          (course) => course._id === updatedCourse._id ? updatedCourse : course)
      })))
  }
  render() {
    return (
      <div className="paqc-course-manager-container">
        <Route path="/courses/table" exact={true}>
          <CourseTable
            courses={this.state.courses}
            addCourse={this.addCourse}
            updateCourse={this.updateCourse}
            deleteCourse={this.deleteCourse}
          />
        </Route>
        <Route path="/courses/grid" exact={true}>
          <CourseGrid
            courses={this.state.courses}
            addCourse={this.addCourse}
            updateCourse={this.updateCourse}
            deleteCourse={this.deleteCourse}
          />
        </Route>
        <Route
          path={[
            "/courses/:layout/edit/:courseId",
            "/courses/:layout/edit/:courseId/modules/:moduleId",
            "/courses/:layout/edit/:courseId/modules/:moduleId/lessons/:lessonId",
            "/courses/:layout/edit/:courseId/modules/:moduleId/lessons/:lessonId/topics/:topicId",
            "/courses/:layout/edit/:courseId/modules/:moduleId/lessons/:lessonId/topics/:topicId/:widgetId"
          ]}
          exact={true}
          render={(props) => 
          <CourseEditor history={props.history} />
        }>
        </Route>
        {/* <Route path="/courses/editor">
          <CourseEditor />
        </Route> */}
      </div>
    )
  }
}
export default CourseManager