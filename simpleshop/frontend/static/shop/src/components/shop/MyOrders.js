import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class MyOrder extends Component {

    render() {

        const { orders } = this.props
        console.log(orders)
        let orderList = orders ? (
            orders.map(order => {
                return (
                    <tr key={order.id}>
                        <th scope="row">
                            {order.transaction.transaction_id}
                        </th>
                        <td>Dec-12-2020</td>
                        <td>56</td>
                        <td>Pending</td>
                        <td>$10,000.00</td>
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