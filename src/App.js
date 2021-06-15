import React from 'react';
import { Route } from 'react-router-dom';

import Landing from './components/Landing/Landing.js';
import Project from './components/Project/Project';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

function App() {
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

export default App;
