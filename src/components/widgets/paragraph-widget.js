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
          {editingType === 'HEADING' &&
            <input
              className="form-control mb-2"
              type="text"
              value={cachedItem.text}
              onChange={(key) =>
                callbackFunction({
                  ...cachedItem,
                  text: key.target.value
                })
              } />
          }
          {editingType === 'PARAGRAPH' &&
            <>
              <textarea
                className="form-control"
                type="text"
                value={cachedItem.text}
                onChange={(key) => callbackFunction({
                  ...cachedItem,
                  text: key.target.value
                })}
              ></textarea>
            </>
          }
        </>
      }
      {!editing &&
        <p>{widget.text}</p>
      }
    </>
  )
}
export default ParagraphWidget