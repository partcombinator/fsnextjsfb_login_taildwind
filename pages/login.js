import React, { useState } from 'react'
import Link from 'next/link';
import Layout from '../src/components/Layout';
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'
import { useAuth } from '../src/context/AuthContext'

export default function login() {
    const [isLoading, setIsLoading] = React.useState(false);
    const router = useRouter();
    const { user, login } = useAuth()

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData, { resetForm }) => {
          setIsLoading(true);
            login(formData.userEmail, formData.userPassword)
              .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                toast.success("User login successfully");
                resetForm({ values: "" });
                setIsLoading(false);
                router.push("/dashboard");
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                toast.error(errorMessage);
                setIsLoading(false);
              }
            );
          
          resetForm({ values: "" });
          setIsLoading(false);
        },
      });

  return (
    <>
    <Layout>
            <form className='box-container' onSubmit={formik.handleSubmit}>
                <h1>Login</h1>
                <input type="email" placeholder="Email" className='input'
                    onChange={formik.handleChange}
                    value={formik.values.userEmail}
                    name="userEmail"
                    isInvalid={formik.errors.userEmail}
                    required

                />
                <input type="password"  placeholder="Password" className='input'
                    onChange={formik.handleChange}
                    value={formik.values.userPassword}
                    isInvalid={formik.errors.userPassword}
                    name="userPassword"
                    required
                />


                <button type="submit" className='button'>{ isLoading ? 'Loading' : 'Login' }</button>
                <Link href='/signup'>Register</Link><Link href='/'>Home</Link>
            </form>
       </Layout>     
    </>
  );
}

function initialValues() {
    return {
      userEmail: "",
      userPassword: "",
    };
  }
  
  function validationSchema() {
    return {
      userEmail: Yup.string().required(true),
      userPassword: Yup.string().required(true),
    };
}
