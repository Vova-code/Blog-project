import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import AppContext from '../../utils/AppContext'
import Button from '../atoms/Button'

const Popin = ({ handleValidate }) => {
  const { popin, closePopin } = useContext(AppContext)

  const showPopin = popin.isOpen ? '' : 'hidden'

  useEffect(() => {
    console.log("Popin: ", popin)
  }, [popin])


  return (
    <div className={`z-20 bg-black/50 absolute h-screen w-screen flex justify-center items-center ${showPopin}`}>
      <div className="bg-white p-8 w-1/2 rounded-2xl">
        <h1 className="font-bold text-2xl">{popin.title}</h1>
        <p className="mb-6">{popin.content}</p>
        <div className="flex justify-end">
          <div className="mr-4">
            <Button handleClick={closePopin} type="secondary" text="Annuler"/>
          </div>
          <Button handleClick={handleValidate} type="cancel" text="Supprimer"/>
        </div>
      </div>
    </div>
  )
}

Popin.propTypes = {
  handleValidate: PropTypes.func
}

export default Popin

