import PropTypes from 'prop-types';

const Control = (props) => {
    return (
        <div>
            <button onClick={props.onPlus}>+</button>
            <button onClick={props.onSubtract}>-</button>
            <button onClick={props.onRandomizeColor}>배경색 변경</button>
        </div>
    );
};

Control.propTypes = {
    onPlus: PropTypes.func,
    onSubtract: PropTypes.func,
    onRandomizeColor: PropTypes.func
};

const createWarning = (funcName) => {
    return () => console.warn(`${funcName}가 정의되지 않았습니다.`);
}

Control.defaultProps = {
    onPlus: createWarning('onPlus'),
    onSubtract: createWarning('onSubtract'),
    onRandomizeColor: createWarning('onRandomizeColor'),
};

export default Control;