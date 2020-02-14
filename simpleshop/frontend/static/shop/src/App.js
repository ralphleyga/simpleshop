import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom'
import history from './history'

import Header from './components/layout/Header'
import Home from './components/shop/Home'
import BrowseProducts from './components/shop/BroweProducts'
import Footer from './components/layout/Footer'

class App extends Component {
  render() {
      return (
        <div class="container">
          <Router history={history}>
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/products/' component={BrowseProducts} />
          </Switch>
          </Router>
          <Footer />
        </div>
        
      )
  }
}

export default App