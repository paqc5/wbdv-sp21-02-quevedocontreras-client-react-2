import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import placeholderImage from '../assets/img/placeholder-600x400.png';

const CourseCard = ({course, deleteCourse, updateCourse}) => {

  const [editing, setEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(course.title)
  const [newDescription, setNewDescription] = useState(course.description)

  const saveNewInfo = () => {

    setEditing(false)
    const date = new Date();

    const updatedCourse = {
      ...course,
      title: newTitle,
      description: newDescription,
      lastModified:
        date.getMonth().toString() + "/" + date.getDay().toString() + "/" + date.getFullYear().toString()
    }
    updateCourse(updatedCourse)
  }


  return (
    <div className="paqc-course-card-container col-12 col-sm-6 col-md-4 col-lg-3">
      <div className="p-1">
        <div className="card">
          <img src={placeholderImage} className="card-img-top" alt="" />
          <div className="card-body">
            <div className="card-title">
              {!editing &&
                <>
                  <h5 className="d-inline">{course.title}</h5>
                  <button className="float-right" 
                    onClick={() => setEditing(true)}>
                    <i className="fas fa-edit"></i>
                  </button>
                </>
              }
              {editing &&
                <div className="row">
                  <input
                    className="form-control form-control-sm col-10 col-sm-8"
                    type="text"
                    value={newTitle}
                    onChange={(event) => setNewTitle(event.target.value)}/>
                  <span className="col-2 col-sm-4 text-right align-self-center">
                    <button onClick={() => saveNewInfo()}>
                      <i className="fas fa-check"></i>
                    </button>
                    <button onClick={() => deleteCourse(course._id)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </span>
                </div>
              }
            </div>
            {!editing && 
            <div className="card-text">
              <p>{course.description}</p>
            </div>}
            {editing &&
            <textarea 
              className="form-control form-control-sm mb-3" 
              maxlength="70"
              value={newDescription}
              onChange={(event) => setNewDescription(event.target.value)}>
            </textarea>}
          </div>
          <Link to={`/courses/grid/edit/${course._id}`} className="btn btn-secondary">Enter Course</Link>
          <div className="card-footer">
            <small className="text-muted">Last updated {course.lastModified}</small>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CourseCard