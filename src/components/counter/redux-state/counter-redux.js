import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import CounterDisplay from './counter-display';
import CounterDown from './counter-down';
import CounterUp from './counter-up';

const initialState = {
  count: 234
}

const reducer = (prevState = initialState, action) => {
  switch(action.type) {
    case "UP":
      return {
        count: prevState.count + 1
      }
    case "DOWN":
      return {
        count: prevState.count - 1
      }
    default:
      return prevState
  }
}

const store = createStore(reducer)

const CounterRedux = () =>
  <Provider store={store}>
    <div>
      <CounterDisplay/>
      <CounterUp/>
      <CounterDown/>
    </div>
  </Provider>
export default CounterRedux