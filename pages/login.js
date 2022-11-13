import React from 'react'
import Link from 'next/link';
import Layout from '../src/components/Layout';

export default function login() {
  return (
    <>
    <Layout>
    <form className='box-container'>
        <h1>Login</h1>
        <input type="email" name="email"  placeholder="Email" className='input'/>
        <input type="password" name="password"  placeholder="Password" className='input'/>

        <button type="submit" className='button'>Register</button>
        <Link href='/register'>Register</Link><Link href='/'>Home</Link>
    </form>
    </Layout>
    </>
  );
}
