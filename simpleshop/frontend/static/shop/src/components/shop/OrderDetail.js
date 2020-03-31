import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class OrderDetail extends Component {

    render() {

        const { orders } = this.props
        const order = orders.find(order => {
                return order.transaction.transaction_id === this.props.match.params.orderItemID
            })

        console.log(this.props.match.params.orderItemID)
        const items = order ? (
            order.order_items.map(item => {
                return (
                    <tr key={item.id}>
                        <td><Link to="/products/1">{item.title}</Link></td>
                        <td>{item.quantity}</td>
                        <td>${item.total_price}</td>
                    </tr>
                )
            })
        ) : (
            null
        )

        return (
            <div className="col-md-12">
                <h3>Transaction ID: #{order ? order.transaction.transaction_id : null}</h3>
                
                <div className="col-md-12">
                    <p className='row'>Total Price: ${order ? order.transaction.price : null}</p>

                    <table className="table">
                        <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                            {items}
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