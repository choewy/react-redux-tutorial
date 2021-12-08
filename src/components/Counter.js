import Control from "./Control";
import Value from "./Value";
import { connect, /* bindActionCreators */ } from "react-redux";
import * as actions from '../actions';

const Counter = (props) => {

    const setRandomColor = () => {
        // 200부터 255까지의 랜덤 색상 배열 생성
        const color = [
            Math.floor((Math.random() * 55) + 200),
            Math.floor((Math.random() * 55) + 200),
            Math.floor((Math.random() * 55) + 200)
        ];

        props.handleSetColor(color);
    };

    const style = {
        background: `rgb(${props.color.join(', ')})`
    }

    return (
        <div style={style}>
            <Value number={props.number} />
            <Control
                onPlus={props.handleIncrement}
                onSubtract={props.handleDecrement}
                onRandomizeColor={setRandomColor} />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        number: state.counter.number,
        color: state.ui.color
    };
};

const mapDispatchToProps = (dispatch) => {
    /* 
        bindActionCreators(actions, dispatch)를 사용해도 되나,
        이를 사용할 경우 액션 이름은 actions와 같음.
        즉, action 이름을 아래와 같이 커스터마이징할 수 없음.
    */
    return {
        handleIncrement: () => { dispatch(actions.increment()) },
        handleDecrement: () => { dispatch(actions.decrement()) },
        handleSetColor: (color) => { dispatch(actions.setColor(color)) }
    };
};

/* connect 함수는 Redux에 연결하는 또 다른 컴포넌트를 반환 */
export default connect(mapStateToProps, mapDispatchToProps)(Counter);