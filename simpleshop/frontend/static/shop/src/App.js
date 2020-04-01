import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import history from './history'

import Header from './components/layout/Header'
import Home from './components/shop/Home'
import BrowseProducts from './components/shop/BroweProducts'
import Footer from './components/layout/Footer'
import ProductDetail from './components/shop/ProductDetail'
import Cart from './components/shop/Cart'
import Login from './components/users/Login'
import MyOrders from './components/shop/MyOrders'
import OrderDetail from './components/shop/OrderDetail'
import Checkout from './components/shop/Checkout'
import ConfirmPayment from './components/shop/ConfirmPayment'
import NoMatch from './components/shop/NoMatch'
import { connect } from 'react-redux'
import { productFetch, categoryFetch, ordersFetch, addressFetch} from './actions/products'
import AddressList from './components/shop/AddressList';


const PrivateRoutes = ({ children, ...rest }) => {
    // redirect to login
    return (
        localStorage.getItem('isLoggedIn') ? (
                children
          ) : (
            <Redirect to='/login/' />
          )
    )
}

class App extends Component {
    componentWillMount() {
        this.props.productFetch()
        this.props.categoryFetch()
        this.props.ordersFetch()
        this.props.addressFetch()
    }

    render() {

        return (
            <div className="container">
                <Router history={history}>
                    <Header />

                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/products/' component={BrowseProducts} />
                        <Route exact path='/products/:productID' component={ProductDetail} />
                        <Route exact path='/login/' component={Login} />
                        <Route exact path='/cart/' component={Cart} />

                        <Route exact path="/logout/">
                            {this.props.auth.isLoggedIn ?<Home /> : <Redirect to="/login/" />}
                        </Route>

                        
                        <PrivateRoutes>
                            <Route exact path='/my-orders/' component={MyOrders} />
                            <Route exact path='/my-orders/:orderItemID' component={OrderDetail} />
                            <Route exact path='/confirm-payment/' component={ConfirmPayment} />

                            <Route exact path='/checkout/' component={Checkout} />
                            <Route exact path='/my-address/' component={AddressList} />
                        </PrivateRoutes>

                        <Route path='*'>
                            <NoMatch />
                        </Route>
                        
                    </Switch>

                    <Footer />
                </Router>
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        product: state.productReducer
    }
}

const mapDispatchToProps = dispatch => ({
    productFetch: () => dispatch(productFetch()),
    categoryFetch: () => dispatch(categoryFetch()),
    ordersFetch: () => dispatch(ordersFetch()),
    addressFetch: () => dispatch(addressFetch())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)