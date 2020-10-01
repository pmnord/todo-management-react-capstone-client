import React from 'react';
import utils from '../../utils/utils';
import ApiService from '../../services/api-service';
import { DragDropContext } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';
import './project.css';

import Category from '../Category/Category.js';
import AddButton from '../AddButton/AddButton';
import ProjectToolbar from '../ProjectToolbar/ProjectToolbar';
/* I took the approach of updating the component state first, and then making the
API call to update the server database. This keeps the app highly responsive and
obscures any delays that might be caused by latency */

export default class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      shareClicked: false,
      appColor: '220',
      projectLoaded: false,
      projectId: null,
    };
  }

  componentDidMount() {
    let newState;
    const uuid = this.props.route.match.params.project_id;

    ApiService.getProjectObject(uuid)
      .then((data) => {
        if (!data) {
          return this.setState({ error: 'No project found' });
        }
        newState = data;

        newState.projectLoaded = true;
        newState.projectId = uuid;
        this.setState(newState);

        const storedColor = window.localStorage.getItem(uuid + '-color');
        if (storedColor) {
          this.setState({ appColor: storedColor });
        }
      })
      .catch((err) => {
        this.setState({ error: 'Failed to fetch project' });
        console.log(err);
      });

    /* -------------------------------------------------------------------------- */
    /*                To enable live updating, uncomment this code                */
    /* -------------------------------------------------------------------------- */

    // window.setInterval(() => {
    //   ApiService.getProjectObject(uuid)
    //     .then((data) => {
    //       if (!data) {
    //         return this.setState({ error: "No project found" });
    //       }
    //       newState = data;

    //       this.setState(newState);
    //     })
    //     .catch((err) => {
    //       this.setState({ error: "Failed to fetch project" });
    //       console.log(err);
    //     });
    // }, 1000);
  }

  createCategory = (newCategoryTitle) => {
    if (newCategoryTitle === '') {
      return;
    } // Disallow empty category titles

    const uuid = utils.uuid();
    const newCategory = {
      uuid,
      title: newCategoryTitle,
      tasks: [],
      index: this.state.categories.length,
    };
    console.log(newCategory);
    const newState = { categories: [...this.state.categories, newCategory] };
    this.setState(newState);

    // Set up a new category object to avoid mutating the one in our state
    // Change to a string so we aren't passing an array into our database
    const apiCategory = { ...newCategory };
    apiCategory.tasks = '';
    apiCategory.project_id = this.state.id;

    // Send the new category to the server to be stored in the database
    ApiService.postCategory(apiCategory).catch((error) => {
      console.log(`Failed to POST category to server: ${error}`);
    });
  };

  deleteCategory = (categoryIndex) => {
    // This needs to re-index all categories higher than it

    const category_id = this.state.categories[categoryIndex].id;
    const newState = { ...this.state };
    newState.categories.splice(categoryIndex, 1);
    this.setState(newState);

    const toReIndex = this.state.categories[categoryIndex]
      ? this.state.categories
          .slice(categoryIndex)
          .map((cat) => ({ id: cat.id, index: cat.index }))
      : [];

    ApiService.deleteCategory(category_id, toReIndex);
  };

  createTask = (categoryIndex, newTaskTitle) => {
    const uuid = utils.uuid();
    const newTaskIndex = this.state.categories[categoryIndex].tasks.length;
    const newTask = {
      uuid,
      title: newTaskTitle,
      category: categoryIndex,
      category_uuid: this.state.categories[categoryIndex].uuid,
      index: newTaskIndex,
      tags: [],
      notes: '',
    };

    const newState = { ...this.state };
    newState.categories[categoryIndex].tasks.push(newTask);
    // TypeError: newState.categories[categoryIndex].tasks.push is not a function

    this.setState(newState);

    ApiService.postTask(newTask)
      .then((dbTask) => {
        const newState = { ...this.state };
        newState.categories[categoryIndex].tasks[newTaskIndex].id = dbTask.id;
      })
      .catch((err) => this.setState({ error: err }));
  };

  deleteTask = (categoryIndex, taskIndex) => {
    const task_id = this.state.categories[categoryIndex].tasks[taskIndex].id;
    const newState = { ...this.state };
    let newTasks = newState.categories[categoryIndex].tasks;

    // Remove the task from the new application state
    newTasks.splice(taskIndex, 1);
    // reIndex the tasks in our application state
    newTasks = newTasks.map((task, index) => {
      task.index = index;
      return task;
    });

    this.setState(newState);

    // Pass the array of tasks to reIndex to our API
    const toReIndex =
      this.state.categories[categoryIndex].tasks.slice(taskIndex) || [];
    ApiService.deleteTask(task_id, toReIndex);
  };

  addTag = (categoryIndex, taskIndex, newTag) => {
    const newState = { ...this.state };
    const task_id = newState.categories[categoryIndex].tasks[taskIndex].id;
    const newTags = newState.categories[categoryIndex].tasks[taskIndex].tags;

    newTags.push(newTag);

    this.setState(newState);

    const newValues = {
      tags: newTags,
    };

    ApiService.patchTask(task_id, newValues);
  };

  deleteTag = (categoryIndex, taskIndex, tagIndex) => {
    const newState = { ...this.state };
    const task_id = newState.categories[categoryIndex].tasks[taskIndex].id;
    const newTags = newState.categories[categoryIndex].tasks[taskIndex].tags;

    newTags.splice(tagIndex, 1);
    this.setState(newState);

    // Send the new tags values to the server to be updated
    const apiTags = [...newTags];
    const newValues = {
      tags: apiTags,
    };

    ApiService.patchTask(task_id, newValues);
  };

  updateNoteOnServer = (categoryIndex, taskIndex, newNote) => {
    const task_id = this.state.categories[categoryIndex].tasks[taskIndex].id;
    const newValues = {
      notes: newNote,
    };

    ApiService.patchTask(task_id, newValues);
  };

  // For handling our controlled input component
  handleChangeNote = (categoryIndex, taskIndex, newNoteValue) => {
    const newState = utils.deepCopy(this.state);

    newState.categories[categoryIndex].tasks[taskIndex].notes = newNoteValue;
    this.setState(newState);
  };

  toggleShowAddForm = () => {
    this.setState({ showAddForm: !this.state.showAddForm });
  };

  componentDidUpdate() {
    if (this.state.showAddForm) {
      const input = document.getElementById('newCategoryName');
      input.focus();
    }
  }

  filterByTag = (e) => {
    const filterValue = e.target.value.toLowerCase();

    // It's important to create a deep copy to avoid mutating the nested reference types
    const newCategories = utils.deepCopy(this.state.categories);

    newCategories.forEach((category) => {
      category.tasks.forEach((task) => {
        let taskHasTag = false;

        task.tags.forEach((tag) => {
          if (tag.toLowerCase().includes(filterValue)) {
            taskHasTag = true;
          }
        });

        if (filterValue === '') {
          // This is a bit hacky. The whole function should be rewritten.
          taskHasTag = true;
        }

        task.display = taskHasTag ? 'flex' : 'none';
      });
    });

    this.setState({ categories: newCategories });
  };

  handleChangeColor = (e) => {
    // TODO: Set a variable in local storage to track a user's color choice
    const hue = e.target.value;

    this.setState({
      ...this.state,
      appColor: hue,
    });
    window.localStorage.setItem(`${this.state.projectId}-color`, hue);
  };

  onDragEnd = ({ source, destination }) => {
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    console.log(this.state);
    const newState = { ...this.state };
    console.log(newState);
    const fromIndex = source.index;
    const toIndex = destination.index;
    let sourceCategoryIndex;
    newState.categories.forEach((category, idx) => {
      if (category.uuid === source.droppableId) {
        sourceCategoryIndex = idx;
      }
    });
    let destinationCategoryIndex;
    newState.categories.forEach((category, idx) => {
      if (category.uuid === destination.droppableId) {
        destinationCategoryIndex = idx;
      }
    });

    const task = newState.categories[sourceCategoryIndex].tasks.splice(
      fromIndex,
      1
    )[0];

    task.category_uuid = destination.droppableId;

    newState.categories[destinationCategoryIndex].tasks.splice(
      toIndex,
      0,
      task
    );

    // Optomistically update the State before getting confirmation on the server update
    this.setState(newState);

    const toReIndex = [
      { ...newState.categories[sourceCategoryIndex] },
      { ...newState.categories[destinationCategoryIndex] },
    ];

    console.log(task);
    ApiService.patchTask(task.id, task, toReIndex);
  };

  render() {
    if (this.state.error) {
      return (
        <div className='project__error'>
          <h2>{this.state.error}</h2>
        </div>
      );
    }

    if (!this.state.projectLoaded) {
      return (
        <div className='project__loading'>
          <h2>Fetching your project...</h2>

          {/* Spinner generously provided by https://github.com/tobiasahlin/SpinKit under The MIT License */}
          <div className='spinner'>
            <div className='bounce1'></div>
            <div className='bounce2'></div>
            <div className='bounce3'></div>
          </div>
        </div>
      );
    }

    const toolbarStyles = {
      backgroundColor: `hsl(${this.state.appColor}, 20%, 97%)`,
    };

    return (
      <section className='project'>
        <div style={toolbarStyles} className='project__toolbar'>
          <Link to='/'>
            <h1 className='toolbar__h1'>Coɩɩab</h1>
          </Link>
          {/* Filter Feature */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className='project__toolbar--filter'
          >
            <label htmlFor='filter-by-tag-input'>Tag: </label>
            <input
              onChange={this.filterByTag}
              type='text'
              id='filter-by-tag-input'
            ></input>
          </form>

          {/* Shareable Link Button */}
          <div className='project__toolbar--share project__toolbar--mobile-hidden'>
            <input
              id='project__toolbar--share--input'
              type='text'
              readOnly
              value={window.location.href}
            />

            <button
              className='btn toolbar__invite-btn'
              aria-label='Copy to clipboard'
              onClick={() => {
                utils.copyToClipboard(`project__toolbar--share--input`);
                this.setState({ shareClicked: true });
              }}
            >
              {/* Clipboard Icon */}
              <svg
                width='20'
                height='20'
                viewBox='2 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M9 2C8.44772 2 8 2.44772 8 3C8 3.55228 8.44772 4 9 4H11C11.5523 4 12 3.55228 12 3C12 2.44772 11.5523 2 11 2H9Z'
                  fill='#4A5568'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M4 5C4 3.89543 4.89543 3 6 3C6 4.65685 7.34315 6 9 6H11C12.6569 6 14 4.65685 14 3C15.1046 3 16 3.89543 16 5V16C16 17.1046 15.1046 18 14 18H6C4.89543 18 4 17.1046 4 16V5ZM7 9C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11H7.01C7.56228 11 8.01 10.5523 8.01 10C8.01 9.44772 7.56228 9 7.01 9H7ZM10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11H13C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9H10ZM7 13C6.44772 13 6 13.4477 6 14C6 14.5523 6.44772 15 7 15H7.01C7.56228 15 8.01 14.5523 8.01 14C8.01 13.4477 7.56228 13 7.01 13H7ZM10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15H13C13.5523 15 14 14.5523 14 14C14 13.4477 13.5523 13 13 13H10Z'
                  fill='hsl(0, 0%, 10%)'
                />
              </svg>
              {this.state.shareClicked ? `Link Copied` : `Invite`}
            </button>
          </div>

          {/* Color Theme Picker */}
          <div className='project__toolbar--color project__toolbar--mobile-hidden'>
            <label htmlFor='project__toolbar--color--select' className='hidden'>
              Color:{' '}
            </label>
            <select
              defaultValue={'DEFAULT'}
              onChange={this.handleChangeColor}
              id='project__toolbar--color--select'
            >
              <option value='DEFAULT' disabled hidden>
                Color Theme
              </option>
              <option value='220'>Blue</option>
              <option value='0'>Red</option>
              <option value='120'>Green</option>
              {/* <option value='60'>Yellow</option> This really needs more saturation to look good */}
              <option value='180'>Cyan</option>
              <option value='300'>Magenta</option>
            </select>
          </div>
        </div>
        <div className='toolbar__spacer'></div>

        {/* Error Display */}
        {this.state.error ? (
          <div className='project__error'>
            <h2>{this.state.error}</h2>
          </div>
        ) : null}

        {/* Kanban Board */}
        <div className='project__board'>
          <DragDropContext onDragEnd={this.onDragEnd}>
            {/* DragDrop Context callbacks: onDragStart, onDragUpdate, onDragEnd(required) */}
            {this.state.categories
              ? this.state.categories.map((category, idx) => (
                  <Category
                    key={idx}
                    uuid={category.uuid}
                    dbIndex={category.index}
                    index={idx}
                    title={category.title}
                    tasks={category.tasks}
                    createTask={this.createTask}
                    deleteTask={this.deleteTask}
                    moveTask={this.moveTask}
                    addTag={this.addTag}
                    deleteTag={this.deleteTag}
                    deleteCategory={this.deleteCategory}
                    updateNote={this.updateNoteOnServer}
                    handleChangeNote={this.handleChangeNote}
                    hue={this.state.appColor}
                  />
                ))
              : null}

            <AddButton
              onClick={this.toggleShowAddForm}
              title='Category'
              onSubmit={(newCategoryName) => {
                this.createCategory(newCategoryName);
              }}
              id={`create-category-button`}
            />

            {/* Display tutorial instruction if no categories have been created yet */}
            {this.state.categories.length < 1 ? (
              <div className='project__getting-started'>
                <svg
                  width='25'
                  height='25'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M9.70711 16.7071C9.31658 17.0976 8.68342 17.0976 8.29289 16.7071L2.29289 10.7071C1.90237 10.3166 1.90237 9.68342 2.29289 9.29289L8.29289 3.29289C8.68342 2.90237 9.31658 2.90237 9.70711 3.29289C10.0976 3.68342 10.0976 4.31658 9.70711 4.70711L5.41421 9H17C17.5523 9 18 9.44772 18 10C18 10.5523 17.5523 11 17 11L5.41421 11L9.70711 15.2929C10.0976 15.6834 10.0976 16.3166 9.70711 16.7071Z'
                    fill='hsl(0, 0%, 0%)'
                  />
                </svg>
                <h2>Create your first category</h2>
              </div>
            ) : null}
          </DragDropContext>
        </div>
      </section>
    );
  }
}

// for each category on this project, render a category component
