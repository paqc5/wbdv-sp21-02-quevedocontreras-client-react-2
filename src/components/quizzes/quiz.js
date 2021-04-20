import React, {useEffect, useState} from 'react'
import {useParams, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import questionsActions from '../../actions/question-actions'
import quizAttemptsActions from '../../actions/quiz-attempts-actions'
import TrueFalseQuestion from '../questions/true-false-question';
import MultipleChoiceQuestion from '../questions/multiple-choice-question';

const Quiz = ({

                score = 0,
                questions = [],
                findQuestionsForQuiz,
                submitQuiz

              }) => {

  const {quizId} = useParams()
  const history = useHistory()

  useEffect(() => {
    findQuestionsForQuiz(quizId)
  }, [findQuestionsForQuiz, quizId])

  const [cachedAnswers, setCachedAnswers] = useState([])
  const [cachedGraded, setCachedGraded] = useState(false)

  const buttonAttr = {
    disabled: ""
  }

  if (cachedGraded) {
    buttonAttr.disabled = "disabled"
  } else {
    buttonAttr.disabled = ""
  }

  const gradeQuiz = (answers) => {
    if (Object.keys(cachedAnswers).length === questions.length) {
      setCachedGraded(true)
      submitQuiz(quizId, {...answers})
    } else {
      alert("Some fields haven't been filled yet. Check Again.")
    }
  }

  const getUserAnswer = (index, answer) => {
    cachedAnswers[`${index}`] = answer
    setCachedAnswers({...cachedAnswers})
  }

  const tryAgain = () => {
    history.go(0)
  }

  return (
      <div className="paqc-quiz-list-container">
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
                            index={ndx}
                            question={question}
                            graded={cachedGraded}
                            onChange={getUserAnswer}/>
                      }
                      {
                        question.type === 'TRUE_FALSE' &&
                        <TrueFalseQuestion
                            index={ndx}
                            question={question}
                            graded={cachedGraded}
                            onChange={getUserAnswer}/>
                      }
                    </li>
                  </div>
              )
            })
          }
        </ul>
        {cachedGraded &&
        <p><strong>Score:</strong> {score} out of 100</p>
        }
        <div className="text-right pb-5">
          {cachedGraded &&
          <button
              className="btn btn-success mr-2"
              onClick={() => {
                tryAgain()
              }}
          >Try Again
          </button>}
          <button
              className={`btn ${cachedGraded ? 'btn-secondary' : 'btn-success'}`}
              onClick={() => {
                gradeQuiz(cachedAnswers)
              }}
              {...buttonAttr}
          >Submit
          </button>
        </div>
      </div>
  )
}

const stateToPropertyMapper = (state) => {
  return {
    questions: state.questionReducer.questions,
    score: state.quizAttemptsReducer.score
  }
}

const dispatchToPropertyMapper = (dispatch) => {
  return {
    findQuestionsForQuiz: (quizId) =>
        questionsActions.findQuestionsForQuiz(dispatch, quizId),
    submitQuiz: (quizId, answers) =>
        quizAttemptsActions.submitQuiz(dispatch, quizId, answers)
  }
}

export default connect(stateToPropertyMapper, dispatchToPropertyMapper)(Quiz)