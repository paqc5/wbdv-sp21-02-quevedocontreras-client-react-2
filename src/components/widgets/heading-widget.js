import React, { useState } from 'react'

const HeadingWidget = (
  {
    widget,
    editing,
    editingType,
    onChange

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
        <>
          {widget.size === 1 && <h1>{widget.text}</h1>}
          {widget.size === 2 && <h2>{widget.text}</h2>}
          {widget.size === 3 && <h3>{widget.text}</h3>}
          {widget.size === 4 && <h4>{widget.text}</h4>}
          {widget.size === 5 && <h5>{widget.text}</h5>}
          {widget.size === 6 && <h6>{widget.text}</h6>}
        </>
      }
    </>
  )
}
export default HeadingWidget