import React, {useState} from 'react'
import RadioButton from './radio-button'

const MultipleChoiceQuestion = ({

                                  index,
                                  question,
                                  graded,
                                  onChange,

                                }) => {

  const [cachedValue, setCachedValue] = useState(question)

  const getInputValue = (value) => {
    onChange(index, {
      ...cachedValue,
      answer: value
    })
    setCachedValue({
      ...cachedValue,
      answer: value
    })
  }

  return (
      <>
        {
          question.choices.map((choice, ndx) => {
            return <RadioButton
                key={ndx}
                id={question._id}
                type={`multchoice-${ndx}`}
                value={choice}
                text={choice}
                answer={question.correct}
                selected={cachedValue.answer === choice ? true : false}
                disabled={graded}
                onChange={getInputValue}
            />
          })
        }
        <p className="mb-0 p-1 pl-2">Your answer: {cachedValue.answer}</p>
      </>
  )
}
export default MultipleChoiceQuestion