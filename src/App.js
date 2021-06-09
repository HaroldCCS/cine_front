import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import Movies from './pages/Movies'
import Users from './pages/Users'
import Header from './components/Header'
class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Route exact path="/movies" component={Movies} />
        <Route exact path="/users" component={Users} />
      </div>
     );
  }
}

export default App;
