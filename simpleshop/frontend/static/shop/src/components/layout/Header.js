import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Search from './SearchNav'

class Header extends Component {
    render() {
        return (
            <div className='navbar navbar-expand-lg navbar-light'>
                <div className='collapse navbar-collapse'>
                    <ul className='navbar-nav mr-auto'>
                        <li className='nav-item'>
                            <Link className='navbar-brand' to='/'>Shopping</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/'>Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/products/'>Browse Products</Link>
                        </li>
                        <li className='nav-item'><a className='nav-link' href='#'>My Orders</a></li>
                        <li className='nav-item'><a className='nav-link' href='#'>My Address</a></li>
                        <li className='nav-item'>
                            <a className='nav-link btn btn-info' href='#'>Cart 0</a>
                        </li>
                    </ul>

                    <Search />
                </div>
            </div>
        )
    }
}

export default Header