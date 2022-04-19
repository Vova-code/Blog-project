import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import Image from 'next/image'

import AppContext from '../../../utils/AppContext'
import Button from '../../atoms/Button'

const UpdatePostForm = ({ post }) => {
  const { updatePost, showAlert, closePopin } = useContext(AppContext)

  return (
    <Formik
      initialValues={{ title: post.title, content: post.content, author: post.author }}
      validate={values => {
        const errors = {}
        if (!values.title) {
          errors.title = 'Veuillez renseigner un titre'
        }
        if (!values.content) {
          errors.content = 'Veuillez renseigner un contenu'
        }
        return errors
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting()
        updatePost(values)
        closePopin()
        showAlert()
      }}>
      {({ isSubmitting, submitForm }) => (
        <div className="w-4/5 flex">
          <Form className="grow flex flex-col justify-center items-center">
            <div className="w-4/5 mb-6">
              <Field placeholder="Titre" className="w-full px-2 py-4 rounded-xl ring-1 ring-black" type="text"
                     name="title"/>
              <ErrorMessage className="-z-10 relative bottom-4 px-2 pt-4 pb-2 text-red-800 font-semibold
                bg-red-400 rounded-b-lg transition-all duration-300" name="title" component="div"/>
            </div>
            <div className="w-4/5 mb-6">
              <Field placeholder="Contenu" className="w-full h-40 px-2 py-4 rounded-xl ring-1 ring-black resize-none"
                     as="textarea"
                     name="content"/>
              <ErrorMessage className="-z-10 relative bottom-4 px-2 pt-4 pb-2 text-red-800 font-semibold
                bg-red-400 rounded-b-lg transition-all duration-300" name="content" component="div"/>
            </div>
            <Button handleClick={() => submitForm()} type='alert' text='Mettre a jour' disabled={isSubmitting} />
          </Form>
        </div>
      )}
    </Formik>
  )
}

UpdatePostForm.propTypes = {
  post: PropTypes.object,
}

export default UpdatePostForm

