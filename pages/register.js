import React from 'react'
import Link from 'next/link';
import Layout from '../src/components/Layout';

export default function register() {
  return (
    <>
    <Layout>
            <form className='box-container'>
                <h1>Register</h1>
                <input type="email" name="email"  placeholder="Email" className='input'/>
                <input type="password" name="password"  placeholder="Password" className='input'/>
                <input type="password" name="repeatPassword"  placeholder="Repear your password" className='input'/>

                <button type="submit" className='button'>Register</button>
                <Link href='/login'>Login</Link><Link href='/'>Home</Link>
            </form>
       </Layout>     
    </>
  );
}
