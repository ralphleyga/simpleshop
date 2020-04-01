import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { updateCart } from '../../actions/products'
import { connect } from 'react-redux'


class CartItem extends Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        let quantity = e.target.value
        this.setState({
            ...this.state,
            [e.target.name]: quantity
        });

        if (quantity) {
            this.props.updateCart({
                id: this.props.order.id,
                quantity: quantity
            })
        }
    }

    render() {
        const { order } = this.props
        return (
            <tr>
                <td>
                    <Link to={'/products/' + order.product_id} >{order.title}</Link>
                </td>
                <td>
                    <input type="number" required className='col-md-2 form-control' defaultValue={order.quantity} onChange={this.handleChange} disabled={this.props.disabled ? true : false} name='cartQuantity'/>
                </td>
                <td>$ {order.total_price}</td>
                <td></td>
            </tr>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateCart: item => dispatch(updateCart(item))
})

export default connect(null, mapDispatchToProps)(CartItem)