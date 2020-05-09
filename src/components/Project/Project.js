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
                            title: "A user's data persists between visits",
                            category: 1,
                            index: 0,
                            tags: ["postgresql", "Nodejs", "REST", "API", "backend"]
                        }
                    ]
                }
            ]
        }

        // We need two copies of our data since one will be mutated 
        // by our filter function
        newState.originalCategories = [...newState.categories];

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

    deleteTag = (categoryIndex, taskIndex, tagIndex) => {
        console.log(`So long, ` + this.state.categories[categoryIndex].tasks[taskIndex].tags[tagIndex]
        )

        const newState = utils.deepCopy(this.state);
        newState.categories[categoryIndex].tasks[taskIndex].tags.splice(tagIndex, 1);
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

        this.setState({ categories: newCategories });
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
                        <button aria-label="Copy to clipboard" onClick={() => {
                            utils.copyToClipboard(`project__toolbar--share--input`);
                            this.setState({ shareClicked: true })
                        }} >

                            {/* Clipboard Icon */}
                            <svg width="20" height="20" viewBox="2 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 2C8.44772 2 8 2.44772 8 3C8 3.55228 8.44772 4 9 4H11C11.5523 4 12 3.55228 12 3C12 2.44772 11.5523 2 11 2H9Z" fill="#4A5568" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M4 5C4 3.89543 4.89543 3 6 3C6 4.65685 7.34315 6 9 6H11C12.6569 6 14 4.65685 14 3C15.1046 3 16 3.89543 16 5V16C16 17.1046 15.1046 18 14 18H6C4.89543 18 4 17.1046 4 16V5ZM7 9C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11H7.01C7.56228 11 8.01 10.5523 8.01 10C8.01 9.44772 7.56228 9 7.01 9H7ZM10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11H13C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9H10ZM7 13C6.44772 13 6 13.4477 6 14C6 14.5523 6.44772 15 7 15H7.01C7.56228 15 8.01 14.5523 8.01 14C8.01 13.4477 7.56228 13 7.01 13H7ZM10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15H13C13.5523 15 14 14.5523 14 14C14 13.4477 13.5523 13 13 13H10Z" fill="hsl(0, 0%, 10%)" />
                            </svg>
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
                                deleteTag={this.deleteTag}
                                deleteCategory={this.deleteCategory} />)
                        : null}

                    {this.state.showAddForm ?
                        <form className="project__create-category-form" onSubmit={this.createCategory}>
                            <label htmlFor="newCategoryName" hidden>New Category</label>
                            <input placeholder="Category Name" onBlur={this.toggleShowAddForm} id="newCategoryName" type="text" />
                            <button>Add</button>
                        </form>
                        : <AddButton onClick={this.toggleShowAddForm} title="Category" />}

                </div>

            </section>
        )
    }
}


// for each category on this project, render a category component