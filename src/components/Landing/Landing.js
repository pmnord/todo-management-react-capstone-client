import React from 'react';
import './Landing.css';
import ApiService from '../../services/api-service';

import Footer from '../Footer/Footer';

// The landing page handles registration and logging in, as well as providing basic information about the app

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newProjectClicked: false,
    };
  }

  componentDidMount() {
    // Set the color of the header back to default
  }

  handleNewProject = (e) => {
    // Prevent multiple clicks from making multiple API requests
    if (this.state.newProjectClicked) {
      return;
    }

    this.setState({ newProjectClicked: true });

    ApiService.postProject().then((uuid) => {
      return this.props.push(`/project/${uuid}`);
    });
  };

  render() {
    return (
      <section className='landing'>
        <div className='landing__main'>
          <section className='landing__pitch'>
            <h1 className='landing__h1'>Coɩɩab</h1>
            <h2>A lightning-fast project starter</h2>

            <p>
              Get up and running with your team in seconds on a collaborative
              Kanban board.
            </p>
            <p>Plan features and track issues — the agile way.</p>
          </section>
          <button className='btn--hover--black' onClick={this.handleNewProject}>
            {this.state.newProjectClicked ? 'Loading...' : 'New Project'}
          </button>
        </div>
        <Footer className='landing__footer'></Footer>
      </section>
    );
  }
}
