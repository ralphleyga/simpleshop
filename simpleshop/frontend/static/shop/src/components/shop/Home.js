import React, { Component } from 'react'
import Cover from './Cover'
import ProductSummary from './ProductSummary'

class Home extends Component {
    render() {
        return (
            <section>
                <Cover />

                <section className="row">
                    <ProductSummary />
                    <ProductSummary />
                    <ProductSummary />
                </section>
            </section>
        )
    }
}

export default Home