import React, { useState } from 'react';

const ParagraphWidget = (
  {
    widget,
    editing,
    editingType,
    onChange,
  }) => {

  const callbackFunction = (item) => {
    setCachedItem(item)
    onChange(item)
  }

  const [cachedItem, setCachedItem] = useState(widget)

  return (
    <>
      {editing &&
        <>
          <textarea
            className="form-control mb-2"
            rows="8"
            type="text"
            value={cachedItem.text}
            onChange={(key) => callbackFunction({
              ...cachedItem,
              type: editingType,
              text: key.target.value
            })}
          ></textarea>
        </>
      }
      {!editing &&
        <p className="mb-0">{widget.text}</p>
      }
    </>
  )
}
export default ParagraphWidget