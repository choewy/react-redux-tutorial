import * as types from './types';

/* 
    Action 객체가 많을 경우
    여러 파일로 나누어 작성
*/

export const increment = () => {
    return {
        type: types.INCREMENT
    };
};

export const decrement = () => {
    return {
        type: types.DECREMENT
    };
};

export const setColor = (color) => {
    return {
        type: types.SET_COLOR,
        color
    };
};
