import React from 'react';
import './errorBoundary.css';

// Any class component with a componentDidCatch() lifecycle method 
// or static getDerivedStateFromError() can act as an error boundary.

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <h2>Whoops! Something went wrong.</h2>
                    <div className="koala">
                        <div className="koala__ear koala__ear--1"></div>
                        <div className="koala__ear koala__ear--2"></div>
                        <div className="koala__eye koala__eye--1"></div>
                        <div className="koala__eye koala__eye--2"></div>
                        <div className="koala__nose"></div>
                    </div>
                </div>
            );
        }
        return this.props.children || null;
    }
}