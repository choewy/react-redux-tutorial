import PropTypes from 'prop-types';

const Value = (props) => {
    return (
        <div>
            {props.number}
        </div>
    )
}

Value.propTypes = {
    number: PropTypes.number
}

Value.defaultProps = {
    number: -1
}

export default Value;