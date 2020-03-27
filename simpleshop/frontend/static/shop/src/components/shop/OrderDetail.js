import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class OrderDetail extends Component {
    render() {
        return (
            <div className="col-md-12">
                <h1>Order: #2343331</h1>
                
                <div className="col-md-12">
                    <h4 className='row'>Total Price: $10,000.00</h4>

                    <table className="table">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">12</th>
                                <td><Link to="/products/1">Adidas Super Star</Link></td>
                                <td>23</td>
                                <td>$10,000</td>
                            </tr>
                            <tr>
                                <th scope="row">12</th>
                                <td><Link to="/products/1">Adidas Super Star</Link></td>
                                <td>23</td>
                                <td>$10,000</td>
                            </tr>
                            <tr>
                                <th scope="row">12</th>
                                <td><Link to="/products/1">Adidas Super Star</Link></td>
                                <td>23</td>
                                <td>$10,000</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        )
    }
}

export default OrderDetail