import * as types from '../actions/types';

// state
const initialState = {
    color: [255, 255, 255]
};

// reducer
const ui = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_COLOR:
            return {
                ...state,
                color: action.color
            };
        default:
            return state;
    };
};

export default ui;