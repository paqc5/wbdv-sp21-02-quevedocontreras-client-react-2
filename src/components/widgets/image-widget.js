import React, { useState, useEffect } from 'react';

const ImageWidget = ({

  widget,
  editing,
  editingType,
  onChange

}) => {

  useEffect(() => {
    setDivWidth(document.getElementById('paqc-widgets-container').clientWidth)
    setDivHeight(document.getElementById('paqc-widgets-container').clientHeight)
  }, [])

  const handleResize = () => {
    setDivWidth(document.getElementById('paqc-widgets-container').clientWidth)
    setDivHeight(document.getElementById('paqc-widgets-container').clientHeight)
  }

  window.addEventListener('resize', handleResize)

  const [cachedItem, setCachedItem] = useState(widget)
  const [divWidth, setDivWidth] = useState(window.innerWidth)
  const [divHeight, setDivHeight] = useState(window.innerWidth)
  const percentageWidth = ((widget.width * 100) / divWidth)
  const percentageHeight = ((widget.height * 100) / divHeight)

  const callbackFunction = (item) => {
    setCachedItem(item)
    onChange(item)
  }

  return (
    <div>
      <div className="text-center">
        <img
            alt=""
          className="my-2"
          src={cachedItem.src}
          width={cachedItem.width ? percentageWidth + "%" : "100%"}
          height={cachedItem.height ? percentageHeight + "%" : "100%"} />
      </div>
      {editing &&
        <>
          <p className="mb-1">Image URL</p>
          <input
            className="form-control mb-2"
            type="text"
            value={cachedItem.src ? cachedItem.src : ""}
            onChange={(key) =>
              callbackFunction({
                ...cachedItem,
                type: editingType,
                src: key.target.value,
              })
            } />
          <p className="mb-1">Image width</p>
          <input
            className="form-control mb-2"
            type="number"
            value={cachedItem.width ? cachedItem.width : ""}
            onChange={(key) =>
              callbackFunction({
                ...cachedItem,
                type: editingType,
                width: key.target.value,
              })
            } />
          <p className="mb-1">Image height</p>
          <input
            className="form-control mb-2"
            type="number"
            value={cachedItem.height ? cachedItem.height : ""}
            onChange={(key) =>
              callbackFunction({
                ...cachedItem,
                type: editingType,
                width: key.target.value,
              })
            } />
        </>
      }
    </div>
  )
}
export default ImageWidget