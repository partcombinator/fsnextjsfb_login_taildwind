import React from 'react'
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const { user, logout } = useAuth();
  return (
        <nav className='navbar'>
            <ul>
                <li><a href='/'>Home</a></li>
                {
                    !user && 
                       <>
                            <li><a href='/login'>Login</a></li>
                            <li><a href='/signup'>Register</a></li>
                       </>
                }
                {
                    user && 
                       <>
                            <li><a href='/dashboard'>Dashboard</a></li>
                            <li><a onClick={ logout }>Logout</a></li>
                       </>
                }
            </ul>
        </nav>
  );
}
