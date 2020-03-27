// eslint-disable-next-line
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Search from './SearchNav'
import { userLogout } from '../../actions/auth'

class Header extends Component {

    render() {
        const handleLogout = event => {
            event.preventDefault()
            this.props.userLogout()
        }

        const mainNav = (
                <>
                <li className='nav-item'>
                    <Link className='navbar-brand' to='/'>Shopping</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to='/'>Home</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to='/products/'>Browse Products</Link>
                </li>
                
                <li className='nav-item'>
                    <Link className='nav-link btn btn-info' to='/cart/'>Cart 0</Link>
                </li>
                </>
        )

        const externalNav = (
            <li className='nav-item'>
                <Link to='/login/' className='nav-link'>Login</Link>
            </li>
        )

        const loggedNav = (
            <>
                <li className='nav-item'>
                        <Link className='nav-link' to='/my-orders/'>My Orders</Link>
                </li>
                <li className='nav-item'><a className='nav-link' href='#'>My Address</a></li>
                <li className='nav-item'>
                    <Link to='/logout/' className='nav-link' onClick={ handleLogout }>Log Out</Link>
                </li>
            </>
        )

        let activeNav = null
        const { isLoggedIn } = this.props;

        if (isLoggedIn ===true) {
            activeNav = loggedNav
        } else {
            activeNav = externalNav
        }

        return (
            <div className='navbar navbar-expand-lg navbar-light'>
                <div className='collapse navbar-collapse'>
                    <ul className='navbar-nav mr-auto'>
                        { mainNav }
                        { activeNav }
                    </ul>
                    <Search />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    }
}

const mapDispatchToProps = dispatch => ({
    userLogout: () => dispatch(userLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)