import React, { Component } from 'react'
import ProductCarousel from './ProductCarousel'
import { connect } from 'react-redux'


class ProductDetail extends Component {

    render() {

        const {productID} = this.props.match.params
        const {products} = this.props
        const productItem = products ? (
                products.find(product => product.id === parseInt(productID))
        ) : (
            <p>Loading...</p>
        )

        return (
            <section>
                <ProductCarousel product={productItem}/>
                <section className='jumbotron text-center bg-light'>
                    <h1>{productItem.title}</h1>
                    <div className='lear text-muted'>
                        {productItem.description}
                    </div>
                </section>

            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.productReducer.products.results,
    }
}

export default connect(mapStateToProps)(ProductDetail)