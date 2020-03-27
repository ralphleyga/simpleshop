import React, { Component } from 'react'
import { connect } from 'react-redux'

import Cover from './Cover'
import ProductList from './ProductList'

class Home extends Component {
    render() {
        return (
            <section>
                <Cover />
                <section className="row">
                    <ProductList products={this.props.products.results} />
                </section>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.productReducer.products
    }
}

export default connect(mapStateToProps)(Home)
