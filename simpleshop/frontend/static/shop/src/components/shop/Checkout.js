import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CartItem from './CartItem'

class Checkout extends Component {
    render() {
        return (
            <div className='row col-md-12'>
                <h1>Checkout</h1>

                <div className='row col-md-12'>
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                </div>

                <Link className='btn btn-info' to='/confirm-payment/'>Confirm Payment - $1,000.00</Link>
            </div>
        )
    }
}

export default Checkout