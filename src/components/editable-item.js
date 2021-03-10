import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const EditableItem = (
  {
    to,
    itemClass,
    item,
    deleteItem,
    updateItem
  }) => {

  const [editing, setEditing] = useState(false)
  const [cachedItem, setCachedItem] = useState(item)

  return (
    <Link to={to} className={itemClass}>
      <span className="paqc-editable-item-container">
        {!editing &&
          <>{item.title}
            <span className="float-right">
              <button>
                <i className="fas fa-edit" onClick={() => setEditing(true)}></i>
              </button>
            </span>
          </>
        }
        {editing &&
          <div className="row">
            <input
              className="form-control form-control-sm col"
              type="text"
              value={cachedItem.title}
              onChange={(key) => setCachedItem(
                {
                  ...cachedItem,
                  title: key.target.value
                })} />
            <span className="align-self-center">
              <button>
                <i className="fas fa-check"
                  onClick={() => {
                    updateItem(cachedItem)
                    setEditing(false)
                  }}></i>
              </button>
              <button>
                <i className="fas fa-trash"
                  onClick={() => {
                    deleteItem(cachedItem)
                    setEditing(false)
                  }}></i>
              </button>
            </span>
          </div>
        }
      </span>
    </Link>
  )
}
export default EditableItem