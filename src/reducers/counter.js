import * as types from '../actions/types';

/* 초기 상태 정의 */
const initialState = {
    number: 0
};

/* 카운터 리듀서 */
const counter = (state = initialState, action) => {
    switch (action.type) {
        case types.INCREMENT:
            return {
                ...state,
                number: state.number + 1
            };
        case types.DECREMENT:
            return {
                ...state,
                number: state.number - 1
            };
        default:
            return state;
    };
};

export default counter;