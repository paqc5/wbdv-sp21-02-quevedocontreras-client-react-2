import React from 'react'

const RadioButton = ({

  id,
  type,
  value,
  text,
  answer,
  selected,
  disabled,
  onChange,

}) => {

  const inputAttr = {
    checked: "",
    disabled: ""
  }
  let color = ""

  if (selected) {
    inputAttr.checked = "checked"
  }

  if (disabled) {
    inputAttr.disabled = "disabled"
  }
  
  if ((disabled && (answer === value) && selected) || (disabled && (answer === value) && (selected !== true))) {
    color = "list-group-item-success"
  } else if (disabled && (answer !== value) && selected) {
    color = "list-group-item-danger"
  }

  return (
    <div className={`paqc-radio-button ${color}`}>
      <input
        type="radio"
        id={`${type}-${id}`}
        name={id}
        value={value}
        {...inputAttr}
        onChange={(key) => onChange(key.currentTarget.value)}
      />
      <label htmlFor={`${type}-${id}`}>{text}</label>
      <div className="float-right">
        {(disabled && (answer === value) && selected) &&
          <i className="fas fa-check"></i>
        }
        {(disabled && (answer !== value) && selected) &&
          <i className="fas fa-times"></i>
        }
      </div><br />
    </div>
  )
}
export default RadioButton