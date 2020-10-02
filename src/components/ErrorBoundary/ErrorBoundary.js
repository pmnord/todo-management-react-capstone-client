import React from 'react';
import { Link } from 'react-router-dom';
import './errorBoundary.css';

// Any class component with a componentDidCatch() lifecycle method
// or static getDerivedStateFromError() can act as an error boundary.

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    const koalaPuns = [
      <h3>
        (not exactly a <em>koalaty</em> user experience)
      </h3>,
      <h3>
        (hopefully this doesn't reflect poorly on our <em>koalafications</em>)
      </h3>,
      <h3>
        (looks like someone forgot to consult <em>koalaty</em> assurance)
      </h3>,
    ];
    const getKoalaPun = () => {
      return koalaPuns[Math.floor(Math.random() * koalaPuns.length)];
    };

    if (this.state.hasError) {
      return (
        <div className='error-boundary'>
          <Link to='/' className='error-boundary__back'>
            ⇦ Go Back
          </Link>
          <h2>Something went wrong.</h2>
          <div className='koala'>
            <div className='koala__ear koala__ear--1'></div>
            <div className='koala__ear koala__ear--2'></div>
            <div className='koala__eye koala__eye--1'></div>
            <div className='koala__eye koala__eye--2'></div>
            <div className='koala__nose'></div>
          </div>
          {getKoalaPun()}
        </div>
      );
    }
    return this.props.children || null;
  }
}
