import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ConfirmPayment extends Component {
    render() {
        return (
            <div className='row'>
                <h1>Payment Confirmed</h1>
                <div className='row'>
                    <p>You have placed your order.</p>

                    <Link className='btn btn-info' to='/products/'>Continue Shopping</Link>
                </div>
            </div>
        )
    }
}

export default ConfirmPayment