import React, { Component } from 'react'
import ProductSummary from './ProductSummary'

class ProductList extends Component {
    render() {
        return (
            <section className='row'>
                <ProductSummary />
                <ProductSummary />
                <ProductSummary />
                <ProductSummary />
            </section>
        )
    }
}

export default ProductList