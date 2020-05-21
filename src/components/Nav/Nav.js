import React, { Component } from 'react';
import './nav.css';
import ApiService from '../../services/api-service';

export default class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
        }
    }
    
    componentDidMount() {
        // Add a listener to close the nav menu if it is open
        const root = document.getElementById('root');
        root.addEventListener('mousedown', (e) => {
            // Prevent the nav from toggling off unless the user clicks outside of the nav div
            for (let element of e.path) {
                if (element.className === "nav") { return; }
            }

            if (this.state.showMenu) {
                this.toggleMenu();
            }
        })
    }

    handleNewProject = () => {
        ApiService.postProject()
            .then(uuid => {
                this.props.push(`/project/${uuid}`);
                window.location.reload(true);
                return;
            })
    }

    handleDemoClick = () => {
        this.props.push(`/project/demo`);
        window.location.reload(true);
    }

    handleAboutClick = () => {
        this.props.push('/');
        this.props.setHeaderColor('220');
    }

    toggleMenu = () => {
        this.setState({ showMenu: !this.state.showMenu });
    }


    handleNavClick = () => {
            this.toggleMenu();
    }

    render() {
        const menuStyles = {
            backgroundColor: `hsl(${this.props.hue}, 50%, 92%)`,
        }

        const iconStyles = {
            borderRadius: '100%',
            backgroundColor: this.state.showMenu
                ? `hsl(0, 0%, 99%)`
                : null,
        }

        return (
            <nav className="nav">

                {/* Menu Icon */}
                <svg style={iconStyles} onClick={this.handleNavClick} className="nav__icon" width="38" height="38" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3 5C3 4.44772 3.44772 4 4 4H16C16.5523 4 17 4.44772 17 5C17 5.55228 16.5523 6 16 6H4C3.44772 6 3 5.55228 3 5Z" fill="#000000" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M3 10C3 9.44772 3.44772 9 4 9H16C16.5523 9 17 9.44772 17 10C17 10.5523 16.5523 11 16 11H4C3.44772 11 3 10.5523 3 10Z" fill="#000000" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M3 15C3 14.4477 3.44772 14 4 14H16C16.5523 14 17 14.4477 17 15C17 15.5523 16.5523 16 16 16H4C3.44772 16 3 15.5523 3 15Z" fill="#000000" />
                </svg>

                {this.state.showMenu ?
                    <ul style={menuStyles} onClick={this.toggleMenu} className="nav__menu">
                        <li onClick={this.handleAboutClick}>About</li>
                        <li onClick={this.handleNewProject}>New Project</li>
                        <li onClick={this.handleDemoClick}>Demo</li>
                    </ul>
                    : null}

            </nav>
        )
    }
}