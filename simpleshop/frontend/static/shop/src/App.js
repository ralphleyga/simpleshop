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
import { connect } from 'react-redux'
import { productFetch, categoryFetch } from './actions/products'


function PrivateRoute({ children, ...rest }) {
    // redirect to login
    return (
        <Route
        {...rest}
        render={({ location }) =>
            localStorage.getItem('isLoggedIn') ? (
            children
          ) : (
            <Redirect to='/login/' />
          )
        }
      />
    )
}

class App extends Component {
    componentWillMount() {
        this.props.productFetch()
        this.props.categoryFetch()
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

                        
                        <PrivateRoute exact path='/my-orders/'>
                            <MyOrders />
                        </PrivateRoute>

                        <PrivateRoute exact path='/my-orders/:orderItemID'>
                            <OrderDetail />
                        </PrivateRoute>

                        <PrivateRoute exact path='/checkout/'>
                            <Checkout />
                        </PrivateRoute>

                        <Route exact path='/confirm-payment/' component={ConfirmPayment} />
                        
                    </Switch>

                    <Footer />
                </Router>
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => ({
    productFetch: () => dispatch(productFetch()),
    categoryFetch: () => dispatch(categoryFetch())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)