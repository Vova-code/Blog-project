import { useContext, useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import Navbar from '../src/components/molecules/Navbar'
import AppContext from '../src/utils/AppContext'

const Signup = () => {
  const { signup } = useContext(AppContext)
  const [userError, setUserError] = useState(null)

  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center">
      <Head>
        <title>BlogiBloga | Enregistrement</title>
      </Head>

      <Navbar userLogged/>
      <div className="mb-8 font-bold text-3xl animate-bounce">Inscription !</div>
      <Formik
        initialValues={{ email: '', username: '', password: '', validatePassword: '' }}
        validate={values => {
          const errors = {}
          if (!values.email) {
            errors.email = 'Veuillez renseigner votre email'
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Adresse mail invalide'
          }
          if (values.password !== values.validatePassword) {
            errors.validatePassword = 'Les mots de passe ne sont pas identiques'
          }
          return errors
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            const { validatePassword, ...filteredValues } = values
            signup(filteredValues).then(res => {
              if (res.status === 409) {

              }
            })
            setSubmitting(false)
          }, 400)
        }}>
        {({ isSubmitting }) => (
          <div className="w-3/5 flex">
            <Image src="/images/stack-of-papers.png" width={290} height={360}/>
            <Form className="grow flex flex-col justify-center items-center">
              <div className="w-4/5 mb-6">
                <Field placeholder="Email" className="w-full px-2 py-4 rounded-xl ring-1 ring-black" type="email"
                       name="email"/>
                <ErrorMessage name="email" component="div"/>
              </div>
              <div className="w-4/5 mb-6">
                <Field placeholder="Pseudo" className="w-full px-2 py-4 rounded-xl ring-1 ring-black" type="text"
                       name="username"/>
              </div>
              <div className="w-4/5 mb-6">
                <Field placeholder="Mot de passe" className="w-full px-2 py-4 rounded-xl ring-1 ring-black"
                       type="password" name="password"/>
                <ErrorMessage name="password" component="div"/>
              </div>
              <div className="w-4/5 mb-6">
                <Field placeholder="Valider le mot de passe" className="w-full px-2 py-4 rounded-xl ring-1 ring-black"
                       type="password" name="validatePassword"/>
                <ErrorMessage name="validatePassword" component="div"/>
              </div>
              <button
                className="bg-black text-white px-4 py-2 rounded-2xl hover:ring hover:ring-red-600 transition-all duration-300"
                type="submit"
                disabled={isSubmitting}>
                Bloggons !
              </button>
            </Form>
          </div>
        )}
      </Formik>
      <div className="flex mt-6">
        <p>Déjà un compte ?</p>
        <Link href="/login">
          <p className="ml-1 text-red-600 font-semibold cursor-pointer">Viens voir ici 🚀</p>
        </Link>
      </div>
    </div>
  )
}

export default Signup

