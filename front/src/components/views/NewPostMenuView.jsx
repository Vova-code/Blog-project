import { ErrorMessage, Field, Form, Formik } from 'formik'
import Image from 'next/image'
import React, { useCallback, useContext, useState } from 'react'
import AppContext from '../../utils/AppContext'
import { postsEntryPoint } from '../../utils/AxiosUtils'

const PostsMenuView = () => {
  const { username, getAuthentication } = useContext(AppContext)
  const [showValidation, setShowValidation] = useState(false)

  const animate = useCallback(() => {
    return showValidation === true ? 'animate-save-alert' : 'hidden'
  }, [showValidation])

  return (
    <div className="w-full max-h-[88.7%] mt-20 px-8 pt-12 flex flex-col items-center overflow-y-scroll">
      <Formik
        initialValues={{ title: '', content: '', author: username }}
        validate={values => {
          const errors = {}
          const formValidated = null
          if (!values.title) {
            errors.title = 'Veuillez renseigner un titre'
          }
          if (!values.content) {
            errors.content = 'Veuillez renseigner un contenu'
          }
          return errors
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          postsEntryPoint.post(`/add/${username}`, values, {
            headers: { 'authentication': getAuthentication() }
          })
            .then(res => {
              if (res.status === 200) {
                setShowValidation(true)
                resetForm({ title: '', content: '', author: username })
              }
            })
          setTimeout(() => {
            setShowValidation(false)
            setSubmitting(false)
          }, 3000)
        }}>
        {({ isSubmitting }) => (
          <div className="w-4/5 flex">
            <Image src="/images/giant-pencil.png" width={320} height={360}/>
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
              <button
                className="bg-black text-white px-4 py-2 rounded-2xl hover:ring hover:ring-red-600 disabled:bg-gray-600 transition-all duration-300"
                type="submit"
                disabled={isSubmitting}>
                Poster !
              </button>
            </Form>
          </div>
        )}
      </Formik>
      {showValidation &&
      <div className={animate()}>
        <div
          className="p-2 bg-green-200 items-center text-white leading-none rounded-full flex inline-flex border border-green-400"
          role="alert">
        <span className="flex rounded-full bg-green-800 uppercase px-2 py-1 text-white text-xs font-bold mr-3">
          Posté
        </span>
          <span className="font-semibold mr-2 text-green-800 text-left flex-auto">Votre post est en ligne</span>
        </div>
      </div>
      }
    </div>
  )
}

export default PostsMenuView

