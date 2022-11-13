import React, { useState } from 'react'
import Link from 'next/link';
import Layout from '../src/components/Layout';
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'
import { useAuth } from '../src/context/AuthContext'

export default function register() {
    const [isLoading, setIsLoading] = React.useState(false);
    const router = useRouter();
    const { user, signup } = useAuth()

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData, { resetForm }) => {
          setIsLoading(true);
          if (formData.userPassword !== formData.userRepeatPassword) {
            console.log("Passwords don't match");
            toast.error("Passwords don't match");
          } else {
            signup(formData.userEmail, formData.userPassword)
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
    <Layout>
            <section>
            <div className="container px-6 py-12 h-full">
              <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                  <img
                    src="/draw2.svg"
                    className="w-full"
                    alt="Phone image"
                  />
                </div>
                <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                  <form onSubmit={formik.handleSubmit}>
                  
                    <div className="mb-6">
                      <input
                        type="text"
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Email address"
                        onChange={formik.handleChange}
                        value={formik.values.userEmail}
                        name="userEmail"
                        isInvalid={formik.errors.userEmail}
                        required
                      />
                    </div>

                  
                    <div className="mb-6">
                      <input
                        type="password"
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Password"
                        onChange={formik.handleChange}
                        value={formik.values.userPassword}
                        isInvalid={formik.errors.userPassword}
                        name="userPassword"
                        required
                      />
                    </div>

                    <div className="mb-6">
                      <input
                        type="password"
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Repeat Password"
                        onChange={formik.handleChange}
                        value={formik.values.userRepeatPassword}
                        isInvalid={formik.errors.userRepeatPassword}
                        name="userRepeatPassword"
                        required
                      />
                    </div>

                    <div className="flex justify-between items-center mb-6">
                      <div className="form-group form-check">
                        <input
                          type="checkbox"
                          className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                          id="exampleCheck3"
                          checked
                        />
                        <label className="form-check-label inline-block text-gray-800" for="exampleCheck2"
                          >Remember me</label
                        >
                      </div>
                      <a
                        href="#!"
                        className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                        >Forgot password?</a
                      >
                    </div>

                  
                    <button
                      type="submit"
                      className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                    >
                      { isLoading ? 'Loading' : 'Register' }
                    </button>

                    <div
                      className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                    >
                      <p className="text-center font-semibold mx-4 mb-0">OR</p>
                    </div>

                    <Link
                      type="submit"
                      className="inline-block px-7 py-3 bg-gray-600 text-white
                              font-medium text-sm leading-snug uppercase rounded
                              text-center
                              shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 
                              focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 
                              active:shadow-lg transition duration-150 ease-in-out w-full"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                      href="/login">Login</Link>

                  </form>
                </div>
              </div>
            </div>
          </section>
       </Layout>
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
