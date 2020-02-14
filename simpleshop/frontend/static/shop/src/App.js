import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom'
import history from './history'

import Header from './components/layout/Header'
import Home from './components/shop/Home'
import BrowseProducts from './components/shop/BroweProducts'
import Footer from './components/layout/Footer'
import ProductDetail from './components/shop/ProductDetail'
import Cart from './components/shop/Cart'

class App extends Component {
  render() {
      return (
        <div className="container">
          <Router history={history}>
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/products/' component={BrowseProducts} />
            <Route exact path='/products/:productID' component={ProductDetail} />
            <Route exact path='/cart/' component={Cart} />
          </Switch>
          </Router>
          <Footer />
        </div>
        
      )
  }
}

export default App