import React from 'react';
import {connect} from 'react-redux';

const CounterDown = ({down}) => 
    <button className="btn btn-primary" onClick={down}>Down</button>

const stateToPropertyMapper = (state) => {}

const dispatchToPropertyMapper = (dispatch) => {
    return {
        down: () => dispatch({type: "DOWN"})
    }
}
export default connect(stateToPropertyMapper, dispatchToPropertyMapper)(CounterDown)
