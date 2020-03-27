import React, { Component } from 'react'
import CartItem from './CartItem'
import { Link } from 'react-router-dom'

class Cart extends Component {
    render() {
        return (
            <div className='row col-md-12'>
                <h1>My Cart</h1>

                <div className='row col-md-12'>
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                </div>

                <Link className='btn btn-info' to='/checkout/'>Checkout - $1,000.00</Link>
            </div>
        )
    }
}

export default Cart