import React from 'react';
import './project.css';
import Category from '../Category/Category.js';
import AddButton from '../AddButton/AddButton';
import utils from '../../utils/utils';
// import ApiService from '../../service/api-service';

export default class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            showAddForm: false,
            shareClicked: false,
        };
    }

    componentDidMount() {
        const newState = {
            categories: [
                {
                    id: utils.uuid(),
                    title: "Backlog",
                    tasks: [
                        {
                            id: utils.uuid(),
                            title: "Clean the litterbox",
                            category: 0,
                            index: 0,
                            tags: ["Cat", "Cleaning"]
                        },
                        {
                            id: utils.uuid(),
                            title: "Learn Mandarin",
                            category: 0,
                            index: 1,
                            tags: ["Language", "Learning"]
                        },
                        {
                            id: utils.uuid(),
                            title: "Implement drag-and-drop",
                            category: 0,
                            index: 2,
                            tags: ["react-dnd", "Someday"]
                        }
                    ]
                },
                {
                    id: utils.uuid(),
                    title: "In Progress",
                    tasks: [
                        {
                            id: utils.uuid(),
                            title: "Eat a Whole Pizza",
                            category: 1,
                            index: 0,
                            tags: ["Food", "Bad Life Choices"]
                        }
                    ]
                }
            ]
        }

        // We need two copies of our data since one will be mutated 
        // by our filter function
        newState.originalCategories = [ ...newState.categories ];

        this.setState(newState);
    }

    createCategory = (e) => {
        e.preventDefault();

        const newCategoryName = e.target.newCategoryName.value;
        const newCategory = {
            title: newCategoryName,
            tasks: []
        }
        const newState = { categories: [...this.state.categories, newCategory] }
        this.setState(newState);

        const input = document.getElementById('newCategoryName');
        input.blur();
    }

    deleteCategory = (categoryIndex) => {
        const newState = { ...this.state };
        newState.categories.splice(categoryIndex, 1);
        this.setState(newState);
    }

    createTask = (categoryIndex, newTaskTitle) => {
        const newTask = {
            title: newTaskTitle,
            category: categoryIndex,
            index: null,
            tags: [],
            id: utils.uuid(),
        }

        const newState = { ...this.state };
        newState.categories[categoryIndex].tasks.push(newTask);

        this.setState(newState);
    }

    deleteTask = (categoryIndex, taskIndex) => {
        const newState = { ...this.state };
        newState.categories[categoryIndex].tasks.splice(taskIndex, 1);

        this.setState(newState);
    }

    moveTask = (categoryIndex, taskIndex, direction) => {
        if (taskIndex - 1 < 0 && direction === 'up') { return; }
        if (categoryIndex - 1 < 0 && direction === 'left') { return; }
        if (categoryIndex + 1 >= this.state.categories.length && direction === 'right') { return; }

        const newState = { ...this.state };
        let taskToMove;

        switch (direction) {
            case 'left':
                taskToMove = newState.categories[categoryIndex].tasks.splice(taskIndex, 1)[0];
                newState.categories[categoryIndex - 1].tasks.push(taskToMove);
                break;
            case 'down':
                taskToMove = newState.categories[categoryIndex].tasks.splice(taskIndex, 1)[0];
                newState.categories[categoryIndex].tasks.splice(taskIndex + 1, 0, taskToMove);
                break;
            case 'up':
                taskToMove = newState.categories[categoryIndex].tasks.splice(taskIndex, 1)[0];
                newState.categories[categoryIndex].tasks.splice(taskIndex - 1, 0, taskToMove);
                break;
            case 'right':
                taskToMove = newState.categories[categoryIndex].tasks.splice(taskIndex, 1)[0];
                newState.categories[categoryIndex + 1].tasks.push(taskToMove);
                break;
            default:
                throw Error('A bad direction was passed to the moveTask() function')
        }

        this.setState(newState);
    }

    addTag = (categoryIndex, taskIndex, newTag) => {
        const newState = { ...this.state };

        newState.categories[categoryIndex].tasks[taskIndex].tags.push(newTag);

        this.setState(newState);
    }

    toggleShowAddForm = () => {
        this.setState({ showAddForm: !this.state.showAddForm });
    }

    componentDidUpdate() {
        if (this.state.showAddForm) {
            const input = document.getElementById('newCategoryName');
            input.focus();
        }
    }

    filterByTag = (e) => {
        const filterValue = e.target.value.toLowerCase();

        // It's important to create a deep copy to avoid mutating the nested reference types
        const newCategories = utils.deepCopy(this.state.originalCategories);

        newCategories.forEach(category => {
            const newTasks = category.tasks.filter(task => {
                let taskHasTag = false;
                task.tags.forEach(tag => {
                    if (tag.toLowerCase().includes(filterValue)) {
                        taskHasTag = true;
                    }
                })
                return taskHasTag;
            })
            category.tasks = newTasks;
        })

        this.setState({categories: newCategories});
    }

    render() {
        return (
            <section className="project">

                <div className="project__toolbar">
                    <form onSubmit={(e) => { e.preventDefault(); }} className="project__toolbar--filter">
                        <label htmlFor="filter-by-tag-input">Filter by Tag: </label>
                        <input onChange={this.filterByTag} type="text" id="filter-by-tag-input"></input>
                    </form>

                    <div className="project__toolbar--share">
                        <input id="project__toolbar--share--input" type='text' readOnly value={`https://wedo-l3x19dfd3.now.sh/project/${this.props.route.match.params.project_id}`} />
                        <button onClick={ () => {
                            utils.copyToClipboard(`project__toolbar--share--input`);
                            this.setState({ shareClicked: true })} } >
                            <span value="http://localhost:3000/project/demo" aria-label="Copy to clipboard"  ><svg viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fillRule="evenodd" d="M2 13h4v1H2v-1zm5-6H2v1h5V7zm2 3V8l-3 3 3 3v-2h5v-2H9zM4.5 9H2v1h2.5V9zM2 12h2.5v-1H2v1zm9 1h1v2c-.02.28-.11.52-.3.7-.19.18-.42.28-.7.3H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3c0-1.11.89-2 2-2 1.11 0 2 .89 2 2h3c.55 0 1 .45 1 1v5h-1V6H1v9h10v-2zM2 5h8c0-.55-.45-1-1-1H8c-.55 0-1-.45-1-1s-.45-1-1-1-1 .45-1 1-.45 1-1 1H3c-.55 0-1 .45-1 1z"></path></svg></span>
                            {this.state.shareClicked ?
                                `Link Copied!`
                                : `Get Shareable Link`}
                        </button>
                    </div>



                </div>

                <div className="project__board">
                    {this.state.categories
                        ? this.state.categories.map((el, idx) =>
                            <Category
                                key={idx}
                                index={idx}
                                title={el.title}
                                tasks={el.tasks}
                                createTask={this.createTask}
                                deleteTask={this.deleteTask}
                                moveTask={this.moveTask}
                                addTag={this.addTag}
                                deleteCategory={this.deleteCategory} />)
                        : null}

                    {this.state.showAddForm ?
                        <form className="project__create-category-form" onSubmit={this.createCategory}>
                            <label htmlFor="newCategoryName" hidden>New Category</label>
                            <input placeholder="Category Name" onBlur={this.toggleShowAddForm} id="newCategoryName" type="text" />
                            <button hidden>Create</button>
                        </form>
                        : <AddButton onClick={this.toggleShowAddForm} title="Category" />}

                </div>

            </section>
        )
    }
}


// for each category on this project, render a category component