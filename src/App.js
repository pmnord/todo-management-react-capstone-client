import React, { Component } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import Landing from './components/Landing/Landing.js';
import Footer from './components/Footer/Footer';
import Project from './components/Project/Project';
import Nav from './components/Nav/Nav';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

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
          <header className="App-header">
            <Link to="/">
              <h1>we ¯\_(ツ)_/¯ do</h1>
            </Link>
            <Nav links={navLinks} />
          </header>

          <ErrorBoundary>

            <Route path='/' exact>
              <Landing />
              <Footer />
            </Route>

            <Route path='/project/:project_id'>
              <Project />
            </Route>

            <Route path='/error' exact>
              <div style={{'height': '300px'}} onClick={() => {throw Error('You hit the error test')}}>
              </div>
            </Route>

          </ErrorBoundary>

      </div>
    );
  }
}

export default App;
