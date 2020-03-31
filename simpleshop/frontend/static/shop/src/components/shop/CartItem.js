import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class CartItem extends Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        const { order } = this.props
        return (
            <tr>
                <td>
                    <Link to={'/products/' + order.product_id} >{order.title}</Link>
                </td>
                <td>
                    <input type="number" className='col-md-2 form-control' defaultValue={order.quantity} onChange={this.handleChange} disabled={this.props.disabled ? true : false}/>
                </td>
                <td>$ {order.price}</td>
                <td></td>
            </tr>
        )
    }
}

export default CartItem