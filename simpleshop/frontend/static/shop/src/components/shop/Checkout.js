import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import CartItem from './CartItem'
import { connect } from 'react-redux'
import { checkoutCart } from '../../actions/products'
import Table from 'react-bootstrap/Table'

class Checkout extends Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            isSubmitSuccess: false
        }
    }

    handleSubmit(e) {
        e.preventDefault()

        this.props.checkoutCart({
            address: this.state.selectAddress
        })
        return (
            <Redirect to="/confirm-payment/" />
        )
    }

    handleChange(e) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    render() {
        const { orders, addresses } = this.props
        let cartList = []
        let totalPrice = 0

        if (orders) {
            // get total price in the cart
            totalPrice = orders.total_price
            // iterate cart items
            cartList = orders.order_items ? (
                orders.order_items.map(order => {
                    return <CartItem key={order.id} order={order} disabled='true'/>
                })
            ) : (
                <tr>
                    <td>No Orders</td>
                </tr>
            )
        }

        const addressList = addresses ? (
            addresses.map(address => {

                return (
                    <tr key={address.id}>
                        <td>
                            <label className="btn">
                                <input type="radio" name='selectAddress' value={address.id} required onChange={this.handleChange} /> 
                                Select
                                
                            </label>
                        </td>
                        <td>{address.full_address}</td>
                    </tr>
                )
            })
            
        ) : (
            <tr>
                <td>No Address</td>
            </tr>
        )

        return (
            <div className='row col-md-12'>
                <h1>Checkout</h1>
                <form className='col-md-12' onSubmit={this.handleSubmit}>
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

                    <div className='row col-md-12'>
                        <h3>Select Address</h3>
                        
                        <Table responsive>
                            <tbody>
                                {addressList}
                            </tbody>
                        </Table>
                    </div>

                    <Link className='btn' to='/cart/'>Back to Cart</Link>  
                    <button className='btn btn-info' type='submit'>Confirm Payment - ${totalPrice}</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.productReducer.cart,
        addresses: state.productReducer.addresses
    }
}

const mapDispatchToProps = dispatch => ({
    checkoutCart: item => dispatch(checkoutCart(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)