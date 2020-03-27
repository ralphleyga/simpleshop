import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class MyOrder extends Component {
    render() {
        return (
            <section className="col-md-12">
            <div className="col-md-12">
                <h2 className="text-center">My Orders</h2>
            </div>

            <table className="table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Number of Items</th>
                    <th>Status</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>

                    <tr>
                        <th scope="row">12</th>
                        <td><Link to='/my-orders/1'>Dec-12-2020</Link></td>
                        <td>56</td>
                        <td>Pending</td>
                        <td>$10,000.00</td>
                    </tr>

                    <tr>
                        <th scope="row">12</th>
                        <td><Link to='/my-orders/1'>Dec-12-2020</Link></td>
                        <td>56</td>
                        <td>Pending</td>
                        <td>$10,000.00</td>
                    </tr>

                    <tr>
                        <th scope="row">12</th>
                        <td><Link to='/my-orders/1'>Dec-12-2020</Link></td>
                        <td>56</td>
                        <td>Pending</td>
                        <td>$10,000.00</td>
                    </tr>

                    <tr>
                        <th scope="row">12</th>
                        <td><Link to='/my-orders/1'>Dec-12-2020</Link></td>
                        <td>56</td>
                        <td>Pending</td>
                        <td>$10,000.00</td>
                    </tr>

                </tbody>
            </table>
            </section>
        )
    }
}

export default MyOrder