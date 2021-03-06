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
        const search = window.location.search
        this.search = search
    }

    setParams(data) {
        let params = new URLSearchParams(data).toString()
        history.push(`/products/?${params}`)
        return params
    }

    onSubmit(data) {
        const params = this.setParams(data)
        this.searchFilter('?' + params)
    }

    searchFilter = async (data) => {
        let resp = await axios.get(`products/${data}`)
        console.log(resp.data.results)
        this.setState({
            ...this.state,
            products: resp.data.results
        })
    }

    componentDidMount() {
        if (this.search) {
            this.searchFilter(this.search)
        }
    }

    render() {
        let productList = []
        if (this.search) {
            productList = this.state.products
        } else {
            productList = this.state.products.length ? this.state.products : this.props.products.results
        }

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
