import React, { useState } from 'react'
import RadioButton from './radio-button'

const TrueFalseQuestion = ({

  id,
  arrId,
  correctAnswer,
  graded,
  onChange

}) => {

  const [cachedValue, setCachedValue] = useState("")

  const getInputValue = (value) => {
    setCachedValue(value)
    onChange(arrId, value)
  }

  const valueTrue = "true"
  const valueFalse = "false"

  return (
    <>
      <RadioButton 
        id={id} 
        type={valueTrue}
        value={valueTrue}
        text="True"
        answer={correctAnswer}
        selected={cachedValue === valueTrue ? true : false}
        disabled={graded}
        onChange={getInputValue}
        />
      <RadioButton 
        id={id} 
        type={valueFalse} 
        value={valueFalse} 
        text="False"
        answer={correctAnswer}
        selected={cachedValue === valueFalse ? true : false}
        disabled={graded}
        onChange={getInputValue}
        />
      <p className="mb-0 p-1 pl-2">Your answer: {cachedValue}</p>
    </>
  )
}
export default TrueFalseQuestion