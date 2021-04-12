import React from 'react';
import CourseAdder from './course-adder';
import CourseRow from './course-row';

export default class CourseTable extends React.Component {

  render() {
    return (
      <div className="paqc-course-table-container">
        <CourseAdder addCourse={this.props.addCourse} />
        <table className="table">
          <tbody>
            {
              this.props.courses.map(c =>
                <CourseRow 
                  key={c._id} 
                  course={c} 
                  deleteCourse={this.props.deleteCourse}
                  updateCourse={this.props.updateCourse} />
              )
            }
          </tbody>
        </table>
      </div>
    )
  }
}