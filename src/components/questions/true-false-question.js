import React, {useState} from 'react'
import RadioButton from './radio-button'

const TrueFalseQuestion = ({
                               index,
                               question,
                               graded,
                               onChange

                           }) => {

    const [cachedValue, setCachedValue] = useState({...question})

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

    const valueTrue = "true"
    const valueFalse = "false"

    return (
        <>
            <RadioButton
                id={question._id}
                type={valueTrue}
                value={valueTrue}
                text="True"
                selected={cachedValue.answer === valueTrue ? true : false}
                answer={question.correct}
                disabled={graded}
                onChange={getInputValue}
            />
            <RadioButton
                id={question._id}
                type={valueFalse}
                value={valueFalse}
                text="False"
                selected={cachedValue.answer === valueFalse ? true : false}
                answer={question.correct}
                disabled={graded}
                onChange={getInputValue}
            />
            <p className="mb-0 p-1 pl-2">Your answer: {cachedValue.answer}</p>
        </>
    )
}
export default TrueFalseQuestion