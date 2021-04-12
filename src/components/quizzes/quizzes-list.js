import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import quizActions from '../../actions/quiz-actions'

const QuizzesList = ({

  quizzes = [],
  findAllQuizzes,
  history

}) => {

  useEffect(() => {
    findAllQuizzes()
  }, [findAllQuizzes])

  const {courseId} = useParams()

  return (
    <div className="paqc-quiz-list-container">
      <div className="paqc-quiz-list-title row">
        <a onClick={() => history.goBack()}>
          <i className="fas fa-chevron-left fa-lg"></i>
        </a>
        <h4>Quizzes</h4>
      </div>
      <ul className="list-group">
        {
          quizzes.map((quiz, ndx) =>
            <li key={ndx} className="list-group-item">
              {quiz.title}
              <Link to={`/courses/${courseId}/quizzes/${quiz._id}`} className="btn btn-primary btn-sm float-right">Start</Link>
            </li>
          )
        }
      </ul>
    </div>
  )
}
const stateToPropertyMapper = (state) => {
  return {
    quizzes: state.quizReducer.quizzes
  }
}

const dispatchToPropertyMapper = (dispatch) => {
  return {
    findAllQuizzes: () =>
      quizActions.findAllQuizzes(dispatch)
  }
}
export default connect(stateToPropertyMapper, dispatchToPropertyMapper)(QuizzesList)