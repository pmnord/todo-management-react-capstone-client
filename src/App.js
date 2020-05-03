import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Landing from './components/Landing/Landing.js';
import Footer from './components/Footer/Footer';
import Project from './components/Project/Project';

function App() {
  return (
    <div className="App">

      <header className="App-header">
        <h1>Todo Together</h1>
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

    </div>
  );
}

export default App;
