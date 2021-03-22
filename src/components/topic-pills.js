import React, {useEffect, useState} from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import EditableItem from './editable-item';
import topicService from '../services/topic-service';

const TopicPills = (
  {
    topics = [],
    createTopic,
    deleteTopic,
    updateTopic,
    findTopicsForLesson

  }) => {

  const { layout, courseId, moduleId, lessonId, topicId } = useParams()
  const [redirectTopic, setRedirectTopic] = useState(false)

  useEffect(() => {
    findTopicsForLesson(lessonId)
    if (topicId === "undefined" || typeof topicId === "undefined") {
      setRedirectTopic(true)
    }
  }, [findTopicsForLesson, lessonId, topicId])

  return (
    <ul className="nav nav-pills">
      {redirectTopic && topics.length !== 0 ?
        <Redirect to={`/courses/${layout}/edit/${courseId}/modules/${moduleId}/lessons/${lessonId}/topics/${topics[0]._id}`} /> : ''}
      {
        topics.map(topic =>
          <li key={topic._id} className="nav-item">
            <EditableItem 
              to={`/courses/${layout}/edit/${courseId}/modules/${moduleId}/lessons/${lessonId}/topics/${topic._id}`}
              item={topic}
              deleteItem={deleteTopic}
              updateItem={updateTopic}
              itemClass={`nav-link ${topicId === topic._id ? 'active' : ''}`} />
          </li>
        )
      }
      <li className="nav-item">
        <button className="nav-link" onClick={() => createTopic(lessonId)}>
          <i className="fas fa-plus-circle p-0"></i>
        </button>
      </li>
    </ul>
  )
}

const stateToPropertyMapper = (state) => {
  return {
    topics: state.topicReducer.topics
  }
}

const dispatchToPropertyMapper = (dispatch) => {
  return {
    findTopicsForLesson: (item) => {
      topicService.findTopicsForLesson(item)
        .then(response => 
          dispatch({type: 'FIND_TOPICS_FOR_LESSON', topics: response}))
    },
    createTopic: (item) => {
      if (item !== "undefined" && typeof item !== "undefined") {
        topicService.createTopic(item, { title: 'New Topic' })
          .then(response =>
            dispatch({ type: 'CREATE_TOPIC', newTopic: response }))
      } else {
        alert("You have to specified the lesson for this topic.")
      }
    },
    deleteTopic: (item) => {
      topicService.deleteTopic(item._id)
        .then(response => 
          dispatch({ type: 'DELETE_TOPIC', topicToDelete: item }))
    },
    updateTopic: (item) => {
      topicService.updateTopic(item._id, item)
        .then(response => 
          dispatch({ type: 'UPDATE_TOPIC', topicToUpdate: item }))
    }
  }
}

export default connect(stateToPropertyMapper, dispatchToPropertyMapper)(TopicPills)