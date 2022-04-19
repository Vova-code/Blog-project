import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import Button from '../atoms/Button'
import { HiX } from 'react-icons/hi'

import AppContext from '../../utils/AppContext'

const Popin = ({ handleValidate }) => {
  const { popin, closePopin } = useContext(AppContext)
  const [ctaType, setCtaType] = useState({ type: '', text: '' })
  const [displayCta, setDisplayCta] = useState(true)

  const showPopin = popin.isOpen ? '' : 'hidden'

  useEffect(() => {
    if (popin.type === 'validation') {
      setCtaType({ type: 'primary', text: 'Valider' })
      setDisplayCta(false)
    } else if (popin.type === 'delete') {
      setCtaType({ type: 'cancel', text: 'Supprimer' })
      setDisplayCta(true)
    }
  }, [popin])

  return (
    <div className={`z-20 bg-black/50 absolute h-screen w-screen flex justify-center items-center ${showPopin}`}>
      <div className="relative bg-white p-8 w-1/2 rounded-2xl">
      {!displayCta && <HiX className="absolute top-5 right-5 font-bold text-2xl cursor-pointer hover:text-red-600" onClick={() => closePopin()}/>}
        <h1 className="mb-6 font-bold text-2xl">{popin.title}</h1>
        <p className="mb-6 flex justify-center">{popin.content}</p>
        {displayCta &&
        <div className="flex justify-end">
          <div className="mr-4">
            <Button handleClick={closePopin} type="secondary" text="Annuler"/>
          </div>
          <Button handleClick={handleValidate} type={ctaType.type} text={ctaType.text}/>
        </div>}
      </div>
    </div>
  )
}

Popin.propTypes = {
  handleValidate: PropTypes.func
}

export default Popin

