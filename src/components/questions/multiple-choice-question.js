import React, { useState } from 'react'
import RadioButton from './radio-button'

const MultipleChoiceQuestion = ({

  id,
  arrId,
  correctAnswer,
  graded,
  choices,
  onChange

}) => {

  const [cachedValue, setCachedValue] = useState("")

  const getInputValue = (value) => {
    setCachedValue(value)
    onChange(arrId, value)
  }

  return (
    <>
      {
        choices.map((choice, ndx) =>
          { 
          return<RadioButton
            key={ndx}
            id={id}
            type={`multchoice-${ndx}`}
            value={choice}
            text={choice}
            answer={correctAnswer}
            selected={cachedValue === choice ? true : false}
            disabled={graded}
            onChange={getInputValue}
          />})
      }
      <p className="mb-0 p-1 pl-2">Your answer: {cachedValue}</p>
    </>
  )
}
export default MultipleChoiceQuestion