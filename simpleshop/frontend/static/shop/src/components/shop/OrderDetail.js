import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class OrderDetail extends Component {

    getOrder() {
        console.log(this.props.match)
    }

    render() {
        console.log(this.props)

        return (
            <div className="col-md-12">
                <h3>Order: #2343331</h3>
                
                <div className="col-md-12">
                    <p className='row'>Total Price: $10,000.00</p>

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

const mapStateToProps = (state) => {
    return {
        orders: state.productReducer.placed_order
    }
}

export default connect(mapStateToProps)(OrderDetail)