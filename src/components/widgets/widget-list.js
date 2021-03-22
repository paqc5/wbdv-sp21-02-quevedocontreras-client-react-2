import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import HeadingWidget from './heading-widget'
import ParagraphWidget from './paragraph-widget'
import widgetActions from '../../actions/widget-actions'


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
      <ul className="list-group list-group-flush">
        <button
          onClick={() => createWidget(topicId)}
          className="btn btn-light border-1">
          Add Widget <i className="fas fa-plus-circle fa-lg"></i>
        </button>
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
                </select>
              }
              {
                widget.type === "HEADING" &&
                <HeadingWidget
                  widget={widget}
                  editing={editingWidget.id === widget.id}
                  editingType={editingWidget.type}
                  onChange={handleUpdate}
                />
              }
              {
                widget.type === "PARAGRAPH" &&
                <ParagraphWidget
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
    createWidget: (topicId) =>
      widgetActions.createWidget(dispatch, topicId),
    updateWidget: (widgetId, widget) =>
      widgetActions.updateWidget(dispatch, widgetId, widget),
    deleteWidget: (widgetId) =>
      widgetActions.deleteWidget(dispatch, widgetId)
  }
}
export default connect(stateToPropertyMapper, dispatchToPropertyMapper)(WidgetList)