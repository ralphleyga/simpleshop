import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class CartItem extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-3">
                
                    <Link to='/products/1/' >Lorem ipsum dolor sit amet suscipit penatibus. Sem velit lectus at fusce fermentum interdum facilisi.</Link>
                </div>
                <div className="col-md-3">
                    Quatity: 34
                </div>
                <div className="col-md-3">
                    $1000.00
                </div>
                <div className="col-md-3">
                    <label>Delete: <input type='checkbox' /></label>
                </div>
                <hr />
            </div>
        )
    }
}

export default CartItem