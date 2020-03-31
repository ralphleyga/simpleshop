// eslint-disable-next-line
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Dropdown from 'react-bootstrap/Dropdown'

import Search from './SearchNav'
import { userLogout } from '../../actions/auth'


const PrivateLink = ({ children, ...rest}) => {
    const nav = rest.isLogin ? (
        children
    ) : (
        null
    )
    return nav
}

class Header extends Component {
    constructor(props) {
        super(props)
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogout(e) {
        e.preventDefault()
        this.props.userLogout()
    }

    render() {
        const { isLoggedIn } = this.props;
        const externalNav = isLoggedIn ? ( null ): (
            <li className='nav-item'>
                <Link to='/login/' className='nav-link'>Login</Link>
            </li>
        )


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
                        <Link className='btn btn-info mr-1' to='/cart/'>Cart</Link>
                    </li>
                    
                    <PrivateLink isLogin={isLoggedIn}>
                        <li className='nav-items'>
                            <Dropdown >
                                <Dropdown.Toggle variant="success" className='' id="dropdown-basic">
                                    My Account
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to='/my-orders/'>My Orders</Dropdown.Item>

                                    <Dropdown.Item as={Link} to='/my-address/'>My Address</Dropdown.Item>

                                    <Link to='/logout/' className='dropdown-item' onClick={ this.handleLogout }>Log Out</Link>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                    </PrivateLink>
                </>
            )

        return (
            <div className='navbar navbar-expand-lg navbar-light'>
                <div className='collapse navbar-collapse'>
                    <ul className='navbar-nav mr-auto'>
                        { mainNav }
                        { externalNav }
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