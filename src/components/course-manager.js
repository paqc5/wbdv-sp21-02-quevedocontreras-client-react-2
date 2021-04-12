import React from 'react';
import { Route } from 'react-router-dom';
import courseService from '../services/course-service';
import CourseEditor from './course-editor/course-editor';
import CourseGrid from './courses/course-grid';
import CourseTable from './courses/course-table';
import QuizzesList from './quizzes/quizzes-list';
import Quiz from './quizzes/quiz';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import moduleReducer from '../reducers/modules-reducer';
import lessonReducer from '../reducers/lessons-reducer';
import topicReducer from '../reducers/topics-reducer';
import widgetReducer from '../reducers/widgets-reducer';
import quizReducer from '../reducers/quizzes-reducer';
import questionReducer from '../reducers/questions-reducer';

const reducer = combineReducers({
  moduleReducer: moduleReducer,
  lessonReducer: lessonReducer,
  topicReducer: topicReducer,
  widgetReducer: widgetReducer,
  quizReducer: quizReducer,
  questionReducer: questionReducer
})
// const store = createStore(moduleReducer)
const store = createStore(reducer)


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
      <Provider store={store}>
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
          <Route path="/courses/:courseId/quizzes"
            exact={true}
            render={(props) => <QuizzesList history={props.history} />}>
          </Route>
          <Route path="/courses/:courseId/quizzes/:quizId">
            <Quiz/>
          </Route>
          {/* <Route path="/courses/editor">
          <CourseEditor />
        </Route> */}
        </div>
      </Provider>
    )
  }
}
export default CourseManager