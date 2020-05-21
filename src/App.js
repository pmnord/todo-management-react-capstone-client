import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Landing from './components/Landing/Landing.js';
import Footer from './components/Footer/Footer';
import Project from './components/Project/Project';
import Nav from './components/Nav/Nav';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appColor: '220'
    }
  }

  setHeaderColor = (hue) => {
    this.setState({
      ...this.state,
      appColor: hue,
    });
  }

  render() {
    const headerStyles = {
      backgroundColor: `hsl(${this.state.appColor}, 20%, 90%)`
    }

    return (
      <div className="App">
        <header style={headerStyles} className="App__header">
          <h1>we do</h1>
          <Route path="/" render={route => {
            return <Nav 
              push={route.history.push} 
              hue={this.state.appColor}
              setHeaderColor={this.setHeaderColor} />
          }} />
        </header>
        <div className="App__header-spacer"></div>

        <ErrorBoundary>

          <Route path='/' exact render={route => {
            return (
              <>
                <Landing push={route.history.push} />
                <Footer />
              </>
            )
          }} />

          <Route path='/project/:project_id' render={route => {
            return <Project route={route} setHeaderColor={this.setHeaderColor} />
          }} />

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
