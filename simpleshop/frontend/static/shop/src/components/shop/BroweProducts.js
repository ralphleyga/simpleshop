import React, { Component } from 'react'
import { connect } from 'react-redux'

import ProductList from './ProductList'
import CategoryList from './CategoryList'

class BrowseProducts extends Component {

    render() {
        const search = window.location.search
        const params = new URLSearchParams(search)
        const categoryID = params.get('category')
        let productList = this.props.products.results

        if (categoryID && productList) {
            productList = productList.filter(product => {
                return product.category === parseInt(categoryID)
            })
        }

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
