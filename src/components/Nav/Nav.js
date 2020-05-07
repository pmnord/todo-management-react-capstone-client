import React, { Component } from 'react';
import './nav.css';
import { Link } from 'react-router-dom';

export default class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
        }
    }

    /* The Nav component takes an array of objects with 'path' and 'title' properties
       and generates links for the menu */

    static defaultProps = {
        links: []
    }

    toggleMenu = () => {
        this.setState({ showMenu: !this.state.showMenu });
    }

    componentDidMount() {
        const root = document.getElementById('root')

        root.addEventListener('mousedown', (e) => {

            if(e.path[2].className === "nav__menu") {return;}

            else if (this.state.showMenu) {
                this.toggleMenu();
            }
        })
    }

    handleNavClick = () => {
        if (!this.state.showMenu) {
            this.toggleMenu();
        }
    }

    render() {
        return (
            <nav className="nav">
                
                {/* Menu Icon */}
                <svg onClick={this.handleNavClick} className="nav__icon" width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3 5C3 4.44772 3.44772 4 4 4H16C16.5523 4 17 4.44772 17 5C17 5.55228 16.5523 6 16 6H4C3.44772 6 3 5.55228 3 5Z" fill="#000000" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M3 10C3 9.44772 3.44772 9 4 9H16C16.5523 9 17 9.44772 17 10C17 10.5523 16.5523 11 16 11H4C3.44772 11 3 10.5523 3 10Z" fill="#000000" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M3 15C3 14.4477 3.44772 14 4 14H16C16.5523 14 17 14.4477 17 15C17 15.5523 16.5523 16 16 16H4C3.44772 16 3 15.5523 3 15Z" fill="#000000" />
                </svg>

                {this.state.showMenu ?
                    <ul onBlur={this.toggleMenu} onClick={this.toggleMenu} className="nav__menu">
                        {this.props.links.map((link, idx) => {
                            return <Link key={idx} to={link.path}><li>{link.title}</li></Link>
                        })}
                    </ul>
                    : null}

            </nav>
        )
    }
}