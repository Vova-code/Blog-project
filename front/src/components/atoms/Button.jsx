import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ text, type, handleClick }) => {
  let classname
  if (type === 'primary') {
    classname = 'button_primary'
  } else if (type === 'secondary') {
    classname = 'button_secondary'
  } else if (type === 'cancel') {
    classname = 'button_cancel'
  } else if (type === 'alert') {
    classname = 'button_alert'
  }

  return (
    <button
      onClick={() => handleClick()}
      className={classname}>
      {text}
    </button>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary', 'cancel', 'alert']).isRequired,
  handleClick: PropTypes.func.isRequired
}

export default Button

