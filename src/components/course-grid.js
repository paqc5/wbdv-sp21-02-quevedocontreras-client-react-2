import React from 'react';
import CourseAdder from './course-adder';
import CourseCard from './course-card';

const CourseGrid = ({ courses, addCourse, deleteCourse, updateCourse }) =>
  <div className="paqc-course-grid-container">
    <CourseAdder addCourse={addCourse} />
    <div className="paqc-course-grid-row row">
      {
        courses.map(c =>
          <CourseCard
            key={c._id}
            course={c}
            deleteCourse={deleteCourse}
            updateCourse={updateCourse} />
        )
      }
    </div>
  </div>

export default CourseGrid