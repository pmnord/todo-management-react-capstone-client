import React, { Component } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import Landing from './components/Landing/Landing.js';
import Footer from './components/Footer/Footer';
import Project from './components/Project/Project';
import Context from './Context';
import Nav from './components/Nav/Nav';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      loggedIn: false
    }
  }

  render() {

    const navLinks = this.state.loggedIn ? [
      { path: '/', title: 'Log Out' }, { path: '/project/demo', title: 'Demo' }
    ] : [
        { path: '/', title: 'Log In' }, { path: '/project/demo', title: 'Demo' }
      ];

    return (
      <div className="App">
        <Context.Provider>
          <header className="App-header">
            <Link to="/">
              <h1>ta ¯\_(ツ)_/¯ sks</h1>
            </Link>
            <Nav links={navLinks} />
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
