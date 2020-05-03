import React from 'react';
import './landing.css';

export default class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hello: 'world'
        }
    }

    render() {

        return (
            <section className="landing">
                <section className="landing__pitch">
                    <h2>Todos Together!</h2>
                    <p>Lorem ipsum dolor set amet</p>
                    <p>Lorem ipsum dolor set amet</p>
                    <p>{this.state.hello}</p>
                </section>
                <section className="landing__credentials">
                    <form className="landing__form landing__registration">
                        <h3>Registration</h3>
                        <div>
                            <label htmlFor="landing__registration--username">Username: </label>
                            <input type="text" id="landing__registration--username"></input>
                        </div>
                        <div>
                            <label htmlFor="landing__registration--pw">Password: </label>
                            <input type="text" id="landing__registration--pw"></input>
                        </div>
                        <button>Register</button>
                    </form>
                    <form className="landing__form landing__login">
                        <h3>Log In</h3>
                        <div>
                            <label htmlFor="landing__login--username">Username: </label>
                            <input type="text" id="landing__login--username"></input>
                        </div>
                        <div>
                            <label htmlFor="landing__login--pw">Password: </label>
                            <input type="text" id="landing__login--pw"></input>
                        </div>
                        <button>Log In</button>
                    </form>

                    <button className="landing__demo">Demo the App</button>
                </section>
            </section>
        )
    }
}