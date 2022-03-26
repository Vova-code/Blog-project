import { ErrorMessage, Field, Form, Formik } from 'formik'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'

import Navbar from '../src/components/Navbar'
import AppContext from '../src/utils/AppContext'

const Login = () => {
  const { login } = useContext(AppContext)

  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center">
      <Head>
        <title>BlogiBloga | Connexion</title>
      </Head>

      <Navbar userLogged/>
      <div className="mb-8 font-bold text-3xl animate-bounce">Connectez-vous !</div>
      <Formik
        initialValues={{ username: '', password: '' }}
        validate={values => {
          const errors = {}
          if (!values.username) {
            errors.username = 'Veuillez renseigner votre pseudo'
          } else if (values.username.length < 5) {
            errors.username = 'Pseudo trop court'
          }
          return errors
        }}
        onSubmit={(values, { setSubmitting }) => {
          login(values)
          setSubmitting(false)
        }}>
        {({ isSubmitting }) => (
          <div className="w-3/5 flex">
            <Image src="/images/looney-sign-up-form.png" width={320} height={360}/>
            <Form className="grow flex flex-col justify-center items-center">
              <div className="w-4/5 mb-6 relative">
                <Field placeholder="Pseudo" className="z-30 w-full px-2 py-4 rounded-xl ring-1 ring-black" type="text"
                       name="username"/>
                <ErrorMessage className="-z-10 relative bottom-4 px-2 pt-4 pb-2 text-red-800 font-semibold
                bg-red-400 rounded-b-lg transition-all duration-300"
                              name="username" component="div"/>
              </div>
              <div className="w-4/5 mb-6">
                <Field placeholder="Mot de passe" className="w-full px-2 py-4 rounded-xl ring-1 ring-black"
                       type="password" name="password"/>
                <ErrorMessage name="password" component="div"/>
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
      <div className="flex">
        <p>Pas encore inscrit ?</p>
        <Link href="/signup">
          <p className="ml-1 text-red-600 font-semibold cursor-pointer">Faites le ici 🔥</p>
        </Link>
      </div>
    </div>
  )
}

export default Login
