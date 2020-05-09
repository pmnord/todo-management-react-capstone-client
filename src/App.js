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

    const loggedInLinks = [
      { path: '/', title: 'Log Out' },
      { path: '/error', title: 'See an Error' },
      { path: '/project/demo', title: 'Demo' },
    ];

    const loggedOutLinks = [
      { path: '/', title: 'Log In' },
      { path: '/error', title: 'See an Error' },
      { path: '/project/demo', title: 'Demo' },
    ];

    const navLinks = this.state.loggedIn ? loggedInLinks : loggedOutLinks;

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

          <Route path='/project/:project_id' render={route => {
            return <Project route={route} />
          }}>
          </Route>

          <Route path='/error' exact render={() => {
            throw Error('This is the error route')
          }
          }>
            
          </Route>

        </ErrorBoundary>

      </div>
    );
  }
}

export default App;
