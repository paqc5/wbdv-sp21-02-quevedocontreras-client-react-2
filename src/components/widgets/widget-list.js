import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import HeadingWidget from './heading-widget'
import ParagraphWidget from './paragraph-widget'
import widgetActions from '../../actions/widget-actions'
import ListWidget from './list-widget';
import ImageWidget from './image-widget';


const WidgetList = (
  {
    widgets = [],
    findWidgetsForTopic,
    createWidget,
    updateWidget,
    deleteWidget
  }
) => {

  const { topicId } = useParams()
  const [editingWidget, setEditingWidget] = useState({})
  const [newWidgetType, setNewWidgetType] = useState("")

  const handleUpdate = (childData) => {
    setEditingWidget(childData)
  }

  useEffect(() => {
    if (topicId !== "undefined" || typeof topicId !== undefined) {
      findWidgetsForTopic(topicId)
    }
  }, [findWidgetsForTopic, topicId])

  return (
    <div className="paqc-course-topic-content">
      <ul className="list-group list-group-flush" id="paqc-widgets-container">
        <li className="list-group-item">
          <select 
            className="form-control mb-2"
            value={newWidgetType}
            onChange={(event) =>
              setNewWidgetType(event.target.value)
            }
          >
            <option value="" disabled>-- Select Widget Type --</option>
            <option value="HEADING">Heading</option>
            <option value="PARAGRAPH">Paragraph</option>
            <option value="LIST">List</option>
            <option value="IMAGE">Image</option>
          </select>
          <button
            onClick={() => createWidget(topicId, newWidgetType)}
            className="btn btn-light border-1 w-100">
            Add Widget <i className="fas fa-plus-circle fa-lg"></i>
          </button>
        </li>
        {
          widgets.map(widget =>
            <li key={widget.id} className={`list-group-item ${widget.type === "HEADING" ? 'paqc-widget-heading' : ''}`}>
              {editingWidget.id !== widget.id &&
                <button className="float-right">
                  <i
                    onClick={() => setEditingWidget(widget)}
                    className="fas fa-cog"></i>
                </button>
              }
              {
                editingWidget.id === widget.id &&
                <select
                  className="form-control mb-2"
                  value={editingWidget.type}
                  onChange={(event) =>
                    setEditingWidget(
                      {
                        ...editingWidget,
                        type: event.target.value
                      })
                  }
                >
                  <option value="HEADING">Heading</option>
                  <option value="PARAGRAPH">Paragraph</option>
                  <option value="LIST">List</option>
                  <option value="IMAGE">Image</option>
                </select>
              }
              {
                ((widget.type === "HEADING" && editingWidget.id !== widget.id) || (editingWidget.id === widget.id && editingWidget.type === "HEADING")) &&
                <HeadingWidget
                  widget={widget}
                  editing={editingWidget.id === widget.id}
                  editingType={editingWidget.type}
                  onChange={handleUpdate}
                />
              }
              {
                ((widget.type === "PARAGRAPH" && editingWidget.id !== widget.id) || (editingWidget.id === widget.id && editingWidget.type === "PARAGRAPH")) &&
                <ParagraphWidget
                  widget={widget}
                  editing={editingWidget.id === widget.id}
                  editingType={editingWidget.type}
                  onChange={handleUpdate}
                />
              }
              {
                ((widget.type === "LIST" && editingWidget.id !== widget.id) || (editingWidget.id === widget.id && editingWidget.type === "LIST")) &&
                <ListWidget
                  widget={widget}
                  editing={editingWidget.id === widget.id}
                  editingType={editingWidget.type}
                  onChange={handleUpdate}
                />
              }
              {
                ((widget.type === "IMAGE" && editingWidget.id !== widget.id) || (editingWidget.id === widget.id && editingWidget.type === "IMAGE")) &&
                <ImageWidget
                  widget={widget}
                  editing={editingWidget.id === widget.id}
                  editingType={editingWidget.type}
                  onChange={handleUpdate}
                />
              }
              {editingWidget.id === widget.id && editingWidget.type === "HEADING" &&
                <select
                  className="form-control"
                  value={editingWidget.size}
                  onChange={(key) =>
                    setEditingWidget(
                      {
                        ...editingWidget,
                        size: parseInt(key.target.value)
                      })
                  }
                >
                  <option value={1}>Heading 1</option>
                  <option value={2}>Heading 2</option>
                  <option value={3}>Heading 3</option>
                  <option value={4}>Heading 4</option>
                  <option value={5}>Heading 5</option>
                  <option value={6}>Heading 6</option>
                </select>
              }
              {
                editingWidget.id === widget.id &&
                <span className="float-right my-2">
                  <button>
                    <i
                      onClick={() => {
                        updateWidget(widget.id, editingWidget)
                        setEditingWidget({})
                      }}
                      className="fas fa-check"></i>
                  </button>
                  <button>
                    <i
                      onClick={() => {
                        deleteWidget(widget.id)
                        setEditingWidget({})
                      }}
                      className="fas fa-trash"></i>
                  </button>
                </span>
              }
            </li>
          )
        }
      </ul>
    </div>
  )
}

const stateToPropertyMapper = (state) => {
  return {
    widgets: state.widgetReducer.widgets
  }
}

const dispatchToPropertyMapper = (dispatch) => {
  return {
    findWidgetsForTopic: (topicId) =>
      widgetActions.findWidgetsForTopic(dispatch, topicId),
    createWidget: (topicId, newWidgetType) =>
      widgetActions.createWidget(dispatch, topicId, newWidgetType),
    updateWidget: (widgetId, widget) =>
      widgetActions.updateWidget(dispatch, widgetId, widget),
    deleteWidget: (widgetId) =>
      widgetActions.deleteWidget(dispatch, widgetId)
  }
}
export default connect(stateToPropertyMapper, dispatchToPropertyMapper)(WidgetList)