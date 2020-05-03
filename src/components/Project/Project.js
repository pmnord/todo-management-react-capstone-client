import React from 'react';
import './project.css';
import Category from '../Category/Category.js';
import ApiService from '../../service/api-service';

export default class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
    }

    getCategories() {
        const categories = ApiService.getProjectCategories();

        this.setState({ categories });
    }

    componentDidMount() {
        this.getCategories();
    }

    render() {
        console.log(ApiService.getProjectCategories())
        return (
            <section className="project">

                <div className="project__board">
                    {this.state.categories ? this.state.categories.map((el, idx) => <Category key={idx} title={el.title} tasks={el.tasks} />) : null}
                </div>

            </section>
        )
    }
}


// for each category on this project, render a category component