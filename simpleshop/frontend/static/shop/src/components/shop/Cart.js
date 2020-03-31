import React, { Component } from 'react'
import CartItem from './CartItem'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Table from 'react-bootstrap/Table'


class Cart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            totalPrice: 0,
            cartList: []
        }
    }

    render() {
        const { orders } = this.props
        let cartList = []
        let totalPrice = 0

        if (orders) {
            // get total price in the cart
            totalPrice = orders.total_price
            // iterate cart items
            cartList = orders.order_items ? (
                orders.order_items.map(order => {
                    return <CartItem key={order.id} order={order}/>
                })
            ) : (
                <tr>
                    <td>No ordered items.</td>
                </tr>
            )
        }
        
        return (
            <div className='row col-md-12'>
                <h1>My Cart</h1>

                <div className='row col-md-12'>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Items</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartList}
                    </tbody>
                </Table>
                    
                </div>

                <Link className='btn btn-info' to='/checkout/'>Checkout - ${totalPrice}</Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.productReducer.cart
    }
}

export default connect(mapStateToProps)(Cart)