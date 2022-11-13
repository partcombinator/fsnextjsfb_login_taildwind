import React, { useState } from 'react'
import Link from 'next/link';
import Layout from '../src/components/Layout';
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { auth } from '../src/firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/router'

export default function register() {
    const [isLoading, setIsLoading] = React.useState(false);
    const router = useRouter();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData, { resetForm }) => {
          setIsLoading(true);
          if (formData.userPassword !== formData.userRepeatPassword) {
            console.log("Passwords don't match");
            toast.error("Passwords don't match");
          } else {
            createUserWithEmailAndPassword(auth, formData.userEmail, formData.userPassword)
              .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                toast.success("User created successfully");
                resetForm({ values: "" });
                setIsLoading(false);
                router.push("/login");
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                toast.error(errorMessage);
                setIsLoading(false);
              }
            );
          }  
          resetForm({ values: "" });
          setIsLoading(false);
        },
      });

  return (
    <>
    <Layout>
            <form className='box-container' onSubmit={formik.handleSubmit}>
                <h1>Register</h1>
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
                <input type="password"  placeholder="Repear your password" className='input'
                    onChange={formik.handleChange}
                    value={formik.values.userRepeatPassword}
                    isInvalid={formik.errors.userRepeatPassword}
                    name="userRepeatPassword"
                    required
                />

                <button type="submit" className='button'>{ isLoading ? 'Loading' : 'Register' }</button>
                <Link href='/login'>Login</Link><Link href='/'>Home</Link>
            </form>
       </Layout>     
    </>
  );
}

function initialValues() {
    return {
      userEmail: "",
      userPassword: "",
      userRepeatPassword: "",
    };
  }
  
  function validationSchema() {
    return {
      userEmail: Yup.string().required(true),
      userPassword: Yup.string().required(true),
      userRepeatPassword: Yup.string().required(true),
    };
}
