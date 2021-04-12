import React from 'react';
import { Route, Link } from 'react-router-dom';

export default class CourseAdder extends React.Component {

  state = {
    courseTitle: ''
  }

  setCourseTitle = (input) => this.setState({ courseTitle: input })

  addCourse = (newCourse) => {
    if (newCourse === '') {
      newCourse = 'New Course Title'
    }
    this.props.addCourse(newCourse)
    this.setCourseTitle('')
  }

  render() {
    return (
      <div className="paqc-adder-container">
        <div className="paqc-course-add-header row">
          <div className="paqc-display-lg col-2 align-self-center">Course Manager</div>
          <div className="col-12 col-lg-10 align-self-center">
            <div className="paqc-header-add-form">
              <input
                className="form-control form-control-sm"
                type="text"
                placeholder="New Course Title"
                value={this.state.courseTitle}
                onChange={(key) => this.setCourseTitle(key.target.value)}
              />
              <button
                className="text-right"
                onClick={() => this.addCourse(this.state.courseTitle)}>
                <i className="fas fa-plus-circle fa-lg"></i>
              </button>
            </div>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col" className="">Title</th>
              <th scope="col" className="text-center">
                <Route path="/courses/table">
                  <span className="paqc-display-md">Owned by</span>
                </Route>
              </th>
              <th scope="col" className="text-center">
                <Route path="/courses/table">
                  <span className="paqc-display-lg">Last Modified</span>
                </Route>
              </th>
              <th scope="col"></th>
              <th scope="col" className="text-right">
                <button><i className="fas fa-folder"></i></button>
                <button><i className="fas fa-sort"></i></button>
                <Route path="/courses/table">
                  <Link to="/courses/grid">
                    <button><i className="fas fa-th"></i></button>
                  </Link>
                </Route>
                <Route path="/courses/grid">
                  <Link to="/courses/table">
                    <button><i className="fas fa-th-list"></i></button>
                  </Link>
                </Route>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    )
  }
}