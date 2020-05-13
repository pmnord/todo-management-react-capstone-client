import React from 'react';
import './project.css';
import Category from '../Category/Category.js';
import AddButton from '../AddButton/AddButton';
import utils from '../../utils/utils';
import ApiService from '../../services/api-service';

/* I took the approach of updating the component state first, and then making the
API call to update the server database. This keeps the app responsive and
obscures any delays that might be caused by latency */

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
        let newState;
        const uuid = this.props.route.match.params.project_id;

        ApiService.getProjectObject(uuid)
            .then(data => {
                if (!data) { return this.setState({ error: 'No project found' }) }
                console.log(data);
                newState = data;

                // We need two copies of our data since one will be mutated 
                // by our filter function
                newState.originalCategories = utils.deepCopy(newState.categories);

                this.setState(newState);
            })
            .catch(err => {
                this.setState({ error: 'Failed to fetch project' });
                console.log(err);
            })
    }

    createCategory = (e) => {
        e.preventDefault();

        const newCategoryName = e.target.newCategoryName.value;
        const newCategory = {
            title: newCategoryName,
            tasks: [],
            index: this.state.categories.length
        };
        const newState = { categories: [...this.state.categories, newCategory] };
        this.setState(newState);

        const input = document.getElementById('newCategoryName');
        input.blur();

        // Set up a new category object to avoid mutating the one in our state
        // Change to a string so we aren't passing an array into our database
        const apiCategory = { ...newCategory }
        apiCategory.tasks = '';
        apiCategory.project_id = this.state.id;

        /* After posting the category, the server will respond with the id
        of the new category in the database. This needs to be set in the
        application state to support delete and update requests. */
        ApiService.postCategory(apiCategory)
            .then(dbCategory => {
                const newState = { ...this.state };
                newState.categories[newState.categories.length - 1].id = dbCategory.id;
            })
    }

    deleteCategory = (categoryIndex) => {
        // This needs to re-index all categories higher than it

        const category_id = this.state.categories[categoryIndex].id;
        const newState = { ...this.state };
        newState.categories.splice(categoryIndex, 1);
        this.setState(newState);

        const toReIndex = this.state.categories[categoryIndex]
            ? this.state.categories.slice(categoryIndex).map(cat => ({ id: cat.id, index: cat.index }) )
            : [];

        console.log(toReIndex);

        ApiService.deleteCategory(category_id, toReIndex);
    }

    createTask = (categoryIndex, newTaskTitle) => {
        const newTaskIndex = this.state.categories[categoryIndex].tasks.length;
        const newTask = {
            title: newTaskTitle,
            category: categoryIndex,
            category_id: this.state.categories[categoryIndex].id,
            index: newTaskIndex,
            tags: [],
        }

        const newState = { ...this.state };
        newState.categories[categoryIndex].tasks.push(newTask);
        // TypeError: newState.categories[categoryIndex].tasks.push is not a function

        this.setState(newState);

        ApiService.postTask(newTask)
            .then(dbTask => {
                console.log(dbTask)
                const newState = { ...this.state };
                newState.categories[categoryIndex].tasks[newTaskIndex].id = dbTask.id;
            })
    }

    deleteTask = (categoryIndex, taskIndex) => {
        const task_id = this.state.categories[categoryIndex].tasks[taskIndex].id;
        const newState = { ...this.state };
        let newTasks = newState.categories[categoryIndex].tasks;
        
        // Remove the task from the new application state
        newTasks.splice(taskIndex, 1);
        // reIndex the tasks in our application state
        newTasks = newTasks.map((task, index) => {task.index = index; return task;});
        
        this.setState(newState);
        
        // Pass the array of tasks to reIndex to our API
        const toReIndex = this.state.categories[categoryIndex].tasks.slice(taskIndex) || [];
        ApiService.deleteTask(task_id, toReIndex)
    }

    moveTask = (categoryIndex, taskIndex, direction) => {
        if (taskIndex - 1 < 0 && direction === 'up') { return; }
        if (categoryIndex - 1 < 0 && direction === 'left') { return; }
        if (categoryIndex + 1 >= this.state.categories.length && direction === 'right') { return; }

        const newState = utils.deepCopy(this.state);
        const task_id = this.state.categories[categoryIndex].tasks[taskIndex].id;
        let taskToMove;
        let newCategory;
        let swapee_id;

        switch (direction) {
            case 'left':
                taskToMove = newState.categories[categoryIndex].tasks.splice(taskIndex, 1)[0];
                newState.categories[categoryIndex - 1].tasks.push(taskToMove);
                newCategory = this.state.categories[categoryIndex - 1].id;
                ApiService.patchTask(task_id, { category_id: newCategory });
                break;
            case 'down':
                taskToMove = newState.categories[categoryIndex].tasks.splice(taskIndex, 1)[0];
                newState.categories[categoryIndex].tasks.splice(taskIndex + 1, 0, taskToMove);
                swapee_id = this.state.categories[categoryIndex].tasks[taskIndex + 1].id;
                ApiService.patchTask(task_id, { index: taskIndex + 1 }, { id: swapee_id, index: taskIndex })
                break;
            case 'up':
                taskToMove = newState.categories[categoryIndex].tasks.splice(taskIndex, 1)[0];
                newState.categories[categoryIndex].tasks.splice(taskIndex - 1, 0, taskToMove);
                swapee_id = this.state.categories[categoryIndex].tasks[taskIndex - 1].id;
                ApiService.patchTask(task_id, { index: taskIndex - 1 }, { id: swapee_id, index: taskIndex })
                break;
            case 'right':
                taskToMove = newState.categories[categoryIndex].tasks.splice(taskIndex, 1)[0];
                newState.categories[categoryIndex + 1].tasks.push(taskToMove);
                newCategory = this.state.categories[categoryIndex + 1].id;
                ApiService.patchTask(task_id, { category_id: newCategory });
                break;
            default:
                throw Error('A bad direction was passed to the moveTask() function')
        }

        this.setState(newState);
    }

    addTag = (categoryIndex, taskIndex, newTag) => {
        const newState = { ...this.state };
        const task_id = newState.categories[categoryIndex].tasks[taskIndex].id;
        const newTags = newState.categories[categoryIndex].tasks[taskIndex].tags;

        newTags.push(newTag);

        this.setState(newState);

        // Send the new tags values to the server to be updated
        const apiTags = newTags.map(tag => tag.replace(/\s/g, '&#32;')).join(' ')
        const newValues = {
            tags: apiTags
        }

        ApiService.patchTask(task_id, newValues)
    }

    deleteTag = (categoryIndex, taskIndex, tagIndex) => {
        const newState = { ...this.state };
        const task_id = newState.categories[categoryIndex].tasks[taskIndex].id;
        const newTags = newState.categories[categoryIndex].tasks[taskIndex].tags;

        newTags.splice(tagIndex, 1);
        this.setState(newState);

        // Send the new tags values to the server to be updated
        const apiTags = newTags.map(tag => tag.replace(/\s/g, '&#32;')).join(' ')
        const newValues = {
            tags: apiTags
        }

        ApiService.patchTask(task_id, newValues)
    }

    updateNote = (categoryIndex, taskIndex, newNote) => {
        const task_id = this.state.categories[categoryIndex].tasks[taskIndex].id;
        const newValues = {
            notes: newNote
        }

        ApiService.patchTask(task_id, newValues)
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
        if (this.state.error) {return (
            <div className="project__error">
                        <h2 >{this.state.error}</h2>
                    </div>
        )}
        return (
            <section className="project">

                <div className="project__toolbar">

                    {/* TODO: Fix the filter feature to only affect _display_ and not change the state */}
                    {/* Filter Feature */}
                    {/* <form onSubmit={(e) => { e.preventDefault(); }} className="project__toolbar--filter">
                        <label htmlFor="filter-by-tag-input">Filter by Tag: </label>
                        <input onChange={this.filterByTag} type="text" id="filter-by-tag-input"></input>
                    </form> */}

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

                    <p className="project__toolbar--hint">Hint: Remember to bookmark this page so you can come back to your project later.</p>

                </div>

                {/* Error Display */}
                {this.state.error
                    ? <div className="project__error">
                        <h2 >{this.state.error}</h2>
                    </div>
                    : null}

                {/* Kanban Board */}
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
                                deleteCategory={this.deleteCategory}
                                updateNote={this.updateNote} />)
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