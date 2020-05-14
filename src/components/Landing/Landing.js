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
                    <p>We Do is a kanban-style collaborative planning tool with a minimalist approach.</p>
                    <p>Get up and running with your team in seconds. Plan and track a new project, or brainstorm new ideas.</p>
                    <p>The template is unoppinionated, allowing <em>you</em> to organize your collab in any way you choose.</p>
                <div aria-label="button"
                    
                    className="landing__create-project"
                    onClick={this.handleNewProject}>
                    {this.state.newProjectClicked
                        ? 'Loading...'
                        : 'New Project'}
                </div>
                </section>


                {/* <section className="landing__credentials">
                    <form className="landing__form landing__registration" onSubmit={this.handleRegistration}>
                        <h3>Registration</h3>
                        <div>
                            <label htmlFor="landing__registration--username">Username: </label>
                            <input disabled type="text" id="landing__registration--username"></input>
                        </div>
                        <div>
                            <label htmlFor="landing__registration--pw">Password: </label>
                            <input disabled type="text" id="landing__registration--pw"></input>
                        </div>
                        <button disabled>Register</button>
                    </form>
                    <form className="landing__form landing__login" onSubmit={this.handleLogin}>
                        <h3>Log In</h3>
                        <div>
                            <label htmlFor="landing__login--username">Username: </label>
                            <input disabled type="text" id="landing__login--username"></input>
                        </div>
                        <div>
                            <label htmlFor="landing__login--pw">Password: </label>
                            <input disabled type="text" id="landing__login--pw"></input>
                        </div>
                        <button disabled>Log In</button>
                    </form>
                    <Link to='/project/demo'>
                        <button className="landing__demo">Demo the App</button>
                    </Link>
                </section> */}

            </section>
        )
    }
}