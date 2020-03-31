import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ConfirmPayment extends Component {
    render() {
        return (
            <div className='col-md-12 text-center'>
                <h1>Page not found</h1>
                <p>The page you are trying to access is not available.  <Link className='btn btn-info' to='/'>Back to Home page.</Link></p>
            </div>
        )
    }
}

export default ConfirmPayment