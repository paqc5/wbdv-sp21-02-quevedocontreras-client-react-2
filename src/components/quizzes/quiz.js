import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import questionsActions from '../../actions/question-actions'
import TrueFalseQuestion from '../questions/true-false-question';
import MultipleChoiceQuestion from '../questions/multiple-choice-question';

const Quiz = ({

  questions = [],
  findQuestionsForQuiz

}) => {

  const { quizId } = useParams()

  useEffect(() => {
    findQuestionsForQuiz(quizId)
  }, [findQuestionsForQuiz, quizId])

  const correctAnswers = questions.map(question => question.correct)
  const [cachedAnswers, setCachedAnswers] = useState({})
  const [cachedGraded, setCachedGraded] = useState(false)

  const gradeQuiz = () => {
    if (Object.keys(cachedAnswers).length === correctAnswers.length) {
      setCachedGraded(true)
    } else {
      alert("Some fields haven't been filled yet. Check Again.")
    }
  }

  const getUserAnswer = (ndx, answer) => {
    cachedAnswers[`${ndx}`] = answer
    setCachedAnswers({ ...cachedAnswers})
  }

  return (
    <div className="paqc-quiz-list-container">
      {console.log(cachedAnswers)}
      <div className="paqc-quiz-list-title row">
        <h4>Quiz</h4>
      </div>
      <ul className="list-group">
        {
          questions &&
          questions.map((question, ndx) => {
            return (
              <div key={ndx} className="mb-3">
                <li className="list-group-item">
                  {question.question}
                </li>
                <li className="list-group-item">
                  {
                    question.type === 'MULTIPLE_CHOICE' &&
                    <MultipleChoiceQuestion 
                      id={question._id} 
                      arrId={ndx}
                      choices={question.choices}
                      correctAnswer={question.correct}
                      graded={cachedGraded}
                      onChange={getUserAnswer} />
                  }
                  {
                    question.type === 'TRUE_FALSE' &&
                    <TrueFalseQuestion 
                      id={question._id}
                      arrId={ndx}
                      correctAnswer={question.correct}
                      graded={cachedGraded}
                      onChange={getUserAnswer} />
                  }
                </li>
              </div>
            )
          })
        }
      </ul>
      <button 
        className="btn btn-success float-right"
        onClick={() => gradeQuiz()}
      >Grade</button>
    </div>
  )
}

const stateToPropertyMapper = (state) => {
  return {
    questions: state.questionReducer.questions
  }
}

const dispatchToPropertyMapper = (dispatch) => {
  return {
    findQuestionsForQuiz: (quizId) =>
      questionsActions.findQuestionsForQuiz(dispatch, quizId)
  }
}

export default connect(stateToPropertyMapper, dispatchToPropertyMapper)(Quiz)