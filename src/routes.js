// Add All your Routes Here

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Main from './containers/Main'
import Home from './containers/Home'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

const DocallyRoutes = () => (
         <Router history={hashHistory}>
          <Route path="/" component={Main}>
            <IndexRoute component={Home} />
            <Route path="/error" component={ErrorPage} />
//	Add Addiitonal Routes Here
         </Route>
        </Router>
  
)

export default DocallyRoutes
