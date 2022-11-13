import React from 'react'
import Head from 'next/head'
import NavBar from './NavBar';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';

export default function Layout({children}) {
  return (
    <>
        <Head>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <NavBar/>
        {children}
        <Footer/>
        <ToastContainer />
    </>
  );
}
