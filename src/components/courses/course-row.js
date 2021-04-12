import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const CourseRow = ({course, deleteCourse, updateCourse}) => {

  const [editing, setEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(course.title)

  const saveNewInfo = () => {

    setEditing(false)
    const date = new Date();

    const updatedCourse = {
      ...course,
      title: newTitle,
      lastModified:
        date.getMonth().toString() + "/" + date.getDay().toString() + "/" + date.getFullYear().toString()
    }
    updateCourse(updatedCourse)
  }

  return(
    <tr>
      <td>
        {!editing && 
          <Link to={`/courses/table/edit/${course._id}`}>{course.title}</Link>}
        {editing && 
          <input 
            className="form-control form-control-sm" 
            type="text"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}/>}
      </td>
      <td className="text-center">
        <span className="paqc-display-md">{course.owner}</span>
      </td>
      <td className="text-center">
        <span className="paqc-display-lg">{course.lastModified}</span>
      </td>
      <td className="text-center">
        <Link to={`/courses/${course._id}/quizzes`}>
          Quizzes
        </Link>
      </td>
      <td className="text-right">
        {editing && 
        <>
          <button onClick={() => saveNewInfo()}>
              <i className="fas fa-check"></i>
          </button>
          <button onClick={() => deleteCourse(course._id)}>
            <i className="fas fa-trash"></i>
          </button>
        </>
        }
        {!editing && 
          <button onClick={() => setEditing(true)}>
            <i className="fas fa-edit"></i>
          </button>
        }
      </td>
    </tr>
  )
}
export default CourseRow