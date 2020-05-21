import React from 'react';
import './landing.css';
import ApiService from '../../services/api-service';

// The landing page handles registration and logging in, as well as providing basic information about the app

export default class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newProjectClicked: false
        }
    }

    componentDidMount() {
        // Set the color of the header back to default
    }

    handleNewProject = (e) => {
        this.setState({ newProjectClicked: true })

        ApiService.postProject()
            .then(uuid => {
                return this.props.push(`/project/${uuid}`);
            })
    }

    render() {

        return (
            <section className="landing">

                <h2>We Do</h2>

                <section className="landing__pitch">
                    <p>We Do is a kanban-style collaborative organizer with a minimalist approach.</p>
                    <p>Get up and running with your team in seconds. Plan a project, track issues, or brainstorm new ideas.</p>
                    <p>The template is unoppinionated, allowing <em>you</em> to organize your collab in any way you choose.</p>
                <div aria-label="button"
                    
                    className="landing__create-project"
                    onClick={this.handleNewProject}>
                    {this.state.newProjectClicked
                        ? 'Loading...'
                        : 'New Project'}
                </div>
                </section>

            </section>
        )
    }
}