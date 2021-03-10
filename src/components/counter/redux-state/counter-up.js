import React from 'react';
import {connect} from 'react-redux';

const CounterUp = ({up}) => 
    <button className="btn btn-primary" onClick={up}>Up</button>

const stateToPropertyMapper = (state) => {}

const dispatchToPropertyMapper = (dispatch) => {
    return {
        up: () => {
            dispatch({type: "UP"})
        }
    }
}
export default connect(stateToPropertyMapper, dispatchToPropertyMapper)(CounterUp)