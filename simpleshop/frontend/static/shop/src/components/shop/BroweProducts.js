import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import ProductList from './ProductList'
import CategoryList from './CategoryList'

class BrowseProducts extends Component {

    constructor(props) {
        super(props)
        this.state = {
            products: [],
            isSearch: false,
            searchFilters: {}
        }
    }

    categoryFilter(categoryID, productList) {
        if (categoryID && productList) {
            productList = productList.filter(product => {
                return product.category === parseInt(categoryID)
            })
        }
        return productList
    }

    render() {
        const search = window.location.search
        const params = new URLSearchParams(search)
        const categoryID = params.get('category')
        let productList = this.props.products.results

        // filter by category
        productList = this.categoryFilter(categoryID, productList)


        return (

            <section className='row'>
                <div className="col-md-2">
                    <h3>Filters</h3>
                    <CategoryList categories={this.props.categories.results} />
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
