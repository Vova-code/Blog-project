import React, { useCallback, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'

import AppContext from '../../utils/AppContext'

const AlertBox = ({ type, message }) => {
  const { showAlertBox } = useContext(AppContext)

  const animate = useCallback(() => {
    return showAlertBox === true ? 'animate-save-alert' : 'hidden'
  }, [showAlertBox])

  let alertType
  let alertTitle
  let alertText

  const setClassNames = () => {
    if (type === 'info') {
      alertType = 'alertTypeInfo'
      alertTitle = 'alertTitleInfo'
      alertText = 'alertTextInfo'
      return
    }
    if (type === 'succès') {
      alertType = 'alertTypeValidate'
      alertTitle = 'alertTitleValidate'
      alertText = 'alertTextValidate'
      return
    }
    alertType = 'alertTypeError'
    alertTitle = 'alertTitleError'
    alertText = 'alertTextError'
  }

  setClassNames()

  return (
    <div>
      <div className={animate()}>
        <div
          className={`p-2 items-center text-white leading-none rounded-full flex inline-flex border 
          ${alertType}`}
          role="alert">
        <span
          className={`flex rounded-full uppercase px-2 py-1 text-xs font-bold mr-3 ${alertTitle}`}>
          {type}
        </span>
          <span className={`font-semibold mr-2 text-left flex-auto ${alertText}`}>{message}</span>
        </div>
      </div>
    </div>
  )
}

AlertBox.propTypes = {
  type: PropTypes.oneOf(['succès', 'info', 'erreur']).isRequired,
  message: PropTypes.string.isRequired
}

export default AlertBox

