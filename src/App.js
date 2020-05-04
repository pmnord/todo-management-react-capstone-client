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
      loggedIn: true
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
              {/* Menu Icon */}
              <svg width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3 5C3 4.44772 3.44772 4 4 4H16C16.5523 4 17 4.44772 17 5C17 5.55228 16.5523 6 16 6H4C3.44772 6 3 5.55228 3 5Z" fill="#000000" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3 10C3 9.44772 3.44772 9 4 9H16C16.5523 9 17 9.44772 17 10C17 10.5523 16.5523 11 16 11H4C3.44772 11 3 10.5523 3 10Z" fill="#000000" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3 15C3 14.4477 3.44772 14 4 14H16C16.5523 14 17 14.4477 17 15C17 15.5523 16.5523 16 16 16H4C3.44772 16 3 15.5523 3 15Z" fill="#000000" />
              </svg>
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
