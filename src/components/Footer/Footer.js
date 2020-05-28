import React from 'react';
import './footer.css';

export default function Footer() {

    return (
        <footer className="footer">
            <a href="https://github.com/pmnord" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github-square fa-3x"></i>
                <p className="hidden">Github</p>
            </a>
        </footer>
    )
}