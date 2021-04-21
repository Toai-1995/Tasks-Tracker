import PropTypes from 'prop-types'

const Button = ({ text, color, onAdd }) => {

    return (
        <button
            className='btn'
            style={{ backgroundColor: color }}
            onClick={onAdd}
        >
            {text}

        </button>
    )
}

Button.defaultProps = {
    color: 'steelblue'
}
Button.prototype = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}

export default Button
