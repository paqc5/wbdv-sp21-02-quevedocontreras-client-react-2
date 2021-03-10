import React from 'react';
import {connect} from 'react-redux';

const CounterDisplay = ({count}) => 
    <h1>Count: {count}</h1>

const stateToPropertyMapper = (state) => {
    return {
        count: state.count
    }
}
export default connect(stateToPropertyMapper)(CounterDisplay)