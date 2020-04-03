import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import history from '../../history'

import ProductList from './ProductList'
import ProductFilter from './ProductFilter'

class BrowseProducts extends Component {

    constructor(props) {
        super(props)
        this.state = {
            products: [],
            isSearch: false,
            searchFilters: {}
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    setParams(data) {
        let params = new URLSearchParams(data).toString()
        history.push(`/products/?${params}`)
    }

    onSubmit(data) {
        this.setParams(data)
    }

    render() {
        let productList = this.props.products.results

        return (

            <section className='row'>
                <div className="col-md-2">
                    <h4>Filters</h4>
                    <ProductFilter categories={this.props.categories.results} onSubmit={this.onSubmit} />
                </div>
                <div className="col-md-10">
                    <h3>Browse Producst</h3>
                    <div className='row'>
                        <ProductList products={productList} />
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.productReducer.products,
        categories: state.productReducer.categories
    }
}

export default connect(mapStateToProps)(BrowseProducts)
