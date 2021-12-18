# React-Redux-Tutorial

본 프로젝트는 React 함수형 컴포넌트에서 Redux를 사용하기 위한 튜토리얼이다. 이를 위해 간단하게 값을 증가, 감소시키는 웹 앱을 구현하였다.

- https://choewy.github.io/react-redux-tutorial/

## 의존성

```json
{
    "dependencies": {
        "@testing-library/jest-dom": "^5.11.4",
        "@testing-library/react": "^11.1.0",
        "@testing-library/user-event": "^12.1.10",
        "gh-pages": "^3.2.3",
        "react": "^17.0.2",
        "react-dom": "^17.0.2",
        "react-redux": "^7.2.6",
        "react-scripts": "4.0.3",
        "redux": "^4.1.2",
        "web-vitals": "^1.0.1"
  }
}
```

## 개요

React는 프레임워크가 아닌 라이브러리이다.

> 프레임워크랑 라이브러리는 다르다. 프레임워크는 모든 기능이 구현된 틀이라고 할 수 있는 반면, 라이브러리는 기본적인 기능만 구현된 틀이다.

React에서는 Props, State를 사용하여 상태를 관리하는데, 컴포넌트가 많고, 각각의 컴포넌트가 하나의 상태 값을 공유해야 하는 상황일 때, Props, State를 사용한다면 매우 번거로워진다. 이러한 문제점을 극복할 수 있도록 해주는 것이 `Redux`이다.

> React에는 Redux와 유사한 기능을 제공하는 Context가 존재한다. 이 개념은 Redux에만 국한되는 것이 아니라, Context에도 일부 적용 가능하다.

## Redux

Redux는 여러 상태 값을 하나의 공간에 저장하는데, 이 공간을 store라고 표현한다. store에 담긴 상태값은 reducer를 통해 변경되며, action의 type 객체를 통해 reducer를 실행할 수 있다. 

> 정확히 말하자면, state 값을 직접 변경하는 것이 아니라, state를 복사하고, reducer를 통해 상태값이 변경된 새로운 state를 반환하는 방식으로 상태값을 관리할 수 있다.

reducer는 두 개의 입력 변수를 받는데, 첫 번째는 state이고, 두 번째는 action 객체이다. state는 앱이 실행되는 동안 상태값이고, action 객체는 어떠한 처리를 할 것인지, 그리고 어떠한 데이터를 전달할 것인지에 대한 정보를 담고 있는 객체이다. 먼저, action을 정의해주도록 하자.

### Action

action에는 type이 존재하며, 이 type에 따라 reducer를 통해 반환된 새로운 state 값을 관리할 수 있다. action의 type을 하나의 action 파일에 작성하여도 되지만, 효율적인 코드 관리를 위해 별도의 파일로 type을 정의해주도록 하자.

```js
/* /src/actions/types.js */

export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const SET_COLOR = "SET_COLOR";
```

>  INCREMENT는 값을 1 증가시켜주는 action type, DECREMENT는 값을 1 감소시켜주는 action type, SET_COLOR는 배경색을 임의로 변경시켜주는 action type이다.

위의 코드에서 볼 수 있듯이 세 개의 action type을 상수로 초기화하였다. type의 이름을 정할 때에는 대문자로 하고, 공백은 `_`로 하는 명명 규칙이 있으니, 이 부분을 잘 지키도록 하자. 이제 action을 정의하도록 하자.

```js
/* /src/actions/index.js */

import * as types from './types';

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

export const setColor = () => {
    return {
        type: types.SET_COLOR
    };
};
```

### Reducer

위에서 정의한 action은 추후 dispatch를 통해 reducer에게 전달된다. dispatch에 대한 설명은 뒤에서 따로 하도록 하고, 먼저, action에 따른 새로운 state를 반환하는 reducer를 작성해보도록 하자.

```js
/* src/reducers/counter.js */

import * as types from '../actions/types';

// state
const initalState = {
    number: 0
};

// reducer
const counter = (state=initialState, action) => {
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
```

위의 코드를 보면, couter라는 reducer는 action 객체를 입력변수로 받고, action type에 따른 결과를 새로운 state로 반환하는 내용을 확인할 수 있다. 이번에는 배경 색을 임의로 변경시키는 action type을 새로운 reducer에서 사용할 수 있도록 아래와 같이 코드를 작성해보도록 하자.

```js
/* src/reducers/ui.js */

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
```

이렇게 두 개의 reducer를 작성하였는데, 앱에서 이를 하나의 reducer로 사용하기 위해 하나의 reducer로 통합해주도록 하자.

```js
/* /src/reducers/index.js */

import { combineReducers } from "redux";
import counter from "./counter";
import ui from "./ui";

const reducers = combineReducers({
    counter, ui
});

export default reducers;
```

위에서 작성한 두 개의 reducer를 reducers라는 변수에 하나로 통합하였고, 이를 앱에서 하나의 reducer로 사용할 수 있다. 

> 계속 언급하는 내용이지만, action을 reducer에게 전달하고, reducer는 action type에 따라 새로운 state 값을 반환한다. dispatch는 action을 reducer에게 전달해주는 역할을 하는데, 이는 앱의 컴포넌트에서 직접 사용하면서 설명하도록 하겠다.  

### Store, Provider

action에는 type 속성이 필수로 포함되어야 하고, 그 외 다른 속성이 포함될 수 있다. store와 dispatch를 앱에서 사용하기 위해서는 앱의 컴포넌트를 Provider에 전달해주어야 한다.

```jsx
/* /src/redux.js */

import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./reducers";

const store = createStore(reducers);

const ReduxProvider = (props) => {
    return (
        <Provider store={store}>
            {props.children}
        </Provider>
    );
};

export default ReduxProvider;
```

앞서 작성한 reducers에는 counter, ui라는 두 개의 reducer가 포함되어 있고, 이 각각의 reducer에는 각각의 state가 존재하는데, 이를 store로 변환해주었다. 그리고 Provider에 store를 전달하여 Provider 컴포넌트를 정의하였다. ReduxProvier에 전달되는 props에는 children이 담겨있도록 하였는데, children이 앱의 컴포넌트가 되도록 할 것이다. 그러면, 앱이 실행되는 동안 Provider는 앱의 모든 컴포넌트에 props로 store를 전달해주고, 이를 각각의 컴포넌트에서 사용할 수 있게 된다.

```jsx
/* /src/index.js */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import ReduxProvider from './redux';

ReactDOM.render(
  <ReduxProvider>
    <App />
  </ReduxProvider>,
  document.getElementById('root')
);
```

위의 코드를 보면, 앱의 컴포넌트의 `<App />`을 앞서 정의한 ReduxProvider 컴포넌트로 감싼 확인할 수 있다. 이와 같이 store 정보가 담긴 Provier 컴포넌트에 앱의 컴포넌트를 위치시킴으로써 앱의 모든 컴포넌트에서 store를 사용할 수 있게 된다.

### Connect

마지막으로, 앱의 모든 컴포넌트에서 store를 사용하기 위해서 아래와 같이 해당 컴포넌트를 store에 연결해주어야 한다.

> 본 글에서는 컴포넌트를 store에 연결하는 코드만 나타내었으므로 컴포넌트를 구성하는 코드는 해당 코드가 담긴 페이지로 이동하여 확인하길 바란다.

```jsx
/* /src/components/Counter.js */

// ... (생략)

const mapStateToProps = (state) => {
    return {
        number: state.counter.number,
        color: state.ui.color
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleIncrement: () => { dispatch(actions.increment()) },
        handleDecrement: () => { dispatch(actions.decrement()) },
        handleSetColor: (color) => { dispatch(actions.setColor(color)) }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

