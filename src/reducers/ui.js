import * as types from '../actions/types';

/* 초기 상태 정의 */
const initialState = {
    color: [255, 255, 255]
};

/* ui 리듀서 */
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