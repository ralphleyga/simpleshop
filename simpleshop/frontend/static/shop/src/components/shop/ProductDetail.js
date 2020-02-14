import React, { Component } from 'react'
import ProductCarousel from './ProductCarousel'


class ProductDetail extends Component {
    render() {
        return (
            <section>
                <section className='jumbotron text-center bg-light'>
                    <h1>Adidas Super Star</h1>
                    <div className='lear text-muted'>
                    <p>Lorem ipsum dolor sit amet congue lacinia per massa vulputate. Mattis efficitur massa nibh conubia cubilia consequat metus aliquam a. Vehicula gravida torquent scelerisque nam proin. Mattis venenatis dui felis etiam elementum gravida. Dictumst eu magnis potenti placerat senectus cursus urna ligula.</p>

                    <p>Elit feugiat risus nibh aenean cras. Torquent hendrerit netus nibh conubia rutrum. Magnis ante dapibus potenti duis dui aliquet suspendisse natoque vulputate. Congue blandit consequat semper etiam integer odio tempus.
                    </p>
                    </div>
                </section>

                <ProductCarousel />
            </section>
        )
    }
}

export default ProductDetail