import React, { Component } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import Landing from './components/Landing/Landing.js';
import Footer from './components/Footer/Footer';
import Project from './components/Project/Project';
import Context from './Context';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      categories: []
    }
  }

  render() {
    return (
      <div className="App">
        <Context.Provider>
          <header className="App-header">
            <Link to="/">
              <h1>Todo Together</h1>
            </Link>
            <nav>
              Build a nav component
            </nav>
          </header>

          <Route path='/' exact>
            <Landing />
            <Footer />
          </Route>

          <Route path='/project/:project_id'>
            <Project />
          </Route>
        </Context.Provider>

      </div>
    );
  }
}

export default App;
