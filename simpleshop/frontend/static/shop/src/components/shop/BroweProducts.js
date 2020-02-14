import React, { Component } from 'react'

import ProductList from './ProductList'
import Category from './Category'

class BrowseProducts extends Component {
    render() {
        return (
            <section className='row'>
                <div className="col-md-2">
                    <h3>Filters</h3>
                    <ul className="nav flex-column">
                        <Category />
                        <Category />
                        <Category />
                        <Category />
                    </ul>
                </div>
                <div className="col-md-10">
                    <h3>Browse Producst</h3>
                    <div className='row'>
                        <ProductList />
                    </div>
                </div>
            </section>
        )
    }
}

export default BrowseProducts