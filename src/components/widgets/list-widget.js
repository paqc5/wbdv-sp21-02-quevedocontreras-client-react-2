import React, { useState } from 'react';

const ListWidget = ({

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
  const checkboxAttr = {
    checked: ""
  }
  if (cachedItem.ordered) {
    checkboxAttr.checked = "checked"
  }

  return (
    <div>
      {!editing && !cachedItem.ordered &&
        <ul>
          {
            cachedItem.text.split('\n').map((item, index) =>
              <li key={index}>{item}</li>)
          }
        </ul>
      }
      {!editing && cachedItem.ordered &&
        <ol>
          {
            cachedItem.text.split('\n').map((item, index) =>
              <li key={index}>{item}</li>)
          }
        </ol>
      }
      {editing &&
        <>
          <label htmlFor="list-type">
            <input
              type="checkbox"
              id="list-type"
              onChange={(key) => {
                if (checkboxAttr.checked === "") {
                  checkboxAttr.checked = "checked"
                  callbackFunction({
                    ...cachedItem,
                    type: editingType,
                    ordered: true
                  })
                } else {
                  checkboxAttr.checked = ""
                  callbackFunction({
                    ...cachedItem,
                    type: editingType,
                    ordered: false
                  })
                }
              }

              }
              {...checkboxAttr}
            /> Ordered List
          </label>
          <textarea
            className="form-control mb-2"
            placeholder="Enter one list item per line"
            rows="8"
            value={cachedItem.text}
            onChange={(key) =>
              callbackFunction({
                ...cachedItem,
                type: editingType,
                text: key.target.value
              })
            }
          ></textarea>
        </>
      }
    </div>
  )
}
export default ListWidget