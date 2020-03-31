import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class MyOrder extends Component {

    render() {

        const { orders } = this.props
        let orderList = orders ? (
            orders.map(order => {
                return (
                    <tr key={order.id}>
                        <th scope="row">
                            <Link to={'/my-orders/' + order.transaction.transaction_id}>{order.transaction.transaction_id}</Link>
                        </th>
                        <td>{order.transaction.created_at}</td>
                        <td>{order.total_items}</td>
                        <td>{order.process_status}</td>
                        <td>${order.transaction.price}</td>
                    </tr>)
            })
        ) : (
            <tr>
                <td>No Orders</td>
            </tr>
        )

        return (
            <section className="col-md-12">
            <div className="col-md-12">
                <h2 className="text-center">My Orders</h2>
            </div>

            <table className="table">
                <thead>
                <tr>
                    <th>Transaction ID</th>
                    <th>Date</th>
                    <th>Number of Items</th>
                    <th>Status</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                    {orderList}
                </tbody>
            </table>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.productReducer.placed_order
    }
}

export default connect(mapStateToProps)(MyOrder)