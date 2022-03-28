import React from 'react'
import Image from 'next/image'

import { ErrorMessage, Field, Form, Formik } from 'formik'

const PostsMenuView = () => {
  return (
    <div className="w-full max-h-[88.7%] mt-20 px-8 pt-12 flex flex-col items-center overflow-y-scroll">
      <Formik
        initialValues={{ title: '', content: '', createdAt: null }}
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
          setTimeout(() => {
            values.createdAt = Date.now()
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}>
        {({ isSubmitting }) => (
          <div className="w-4/5 flex">
            <Image src="/images/giant-pencil.png" width={320} height={360}/>
            <Form className="grow flex flex-col justify-center items-center">
              <div className="w-4/5 mb-6">
                <Field placeholder="Titre" className="w-full px-2 py-4 rounded-xl ring-1 ring-black" type="text"
                       name="title"/>
                <ErrorMessage name="title" component="div"/>
              </div>
              <div className="w-4/5 mb-6">
                <Field placeholder="Contenu" className="w-full h-40 px-2 py-4 rounded-xl ring-1 ring-black" type="text"
                       name="content"/>
                <ErrorMessage name="content" component="div"/>
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
    </div>
  )
}

export default PostsMenuView

