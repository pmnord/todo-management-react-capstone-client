import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Landing from './components/Landing/Landing.js';
import Footer from './components/Footer/Footer';
import Project from './components/Project/Project';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appColor: '220',
    };
  }

  render() {
    return (
      <div className='App'>
        <ErrorBoundary>
          <Route
            path='/'
            exact
            render={(route) => {
              return (
                <>
                  <Landing push={route.history.push} />
                  <Footer />
                </>
              );
            }}
          />

          <Route
            path='/project/:project_id'
            render={(route) => {
              return <Project route={route} />;
            }}
          />

          <Route
            path='/error'
            exact
            render={() => {
              throw Error('This is the error route');
            }}
          ></Route>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
