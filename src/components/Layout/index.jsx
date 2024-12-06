import React from 'react';
import Header from '../Header';
import PrivateRoute from '../PrivateRoute';
import './styles.css'

export default function Layout() {
    return (
        <main>
            <Header />
            <div className='content'>
                <PrivateRoute />
            </div>
        </main>
    )
}