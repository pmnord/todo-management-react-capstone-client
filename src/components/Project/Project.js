import React from 'react';
import utils from '../../utils/utils';
import ApiService from '../../services/api-service';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import openSocket from 'socket.io-client';
import config from '../../config.js';

import './project.css';

import Category from '../Category/Category.js';
import AddButton from '../AddButton/AddButton';
import ProjectHeader from '../ProjectHeader/ProjectHeader';
import Announcement from '../Announcement/Announcement';

/* I took the approach of updating the component state first, and then making the
API call to update the server database. This keeps the app highly responsive and
obscures any delays that might be caused by latency */
// This approach is called Optimistic Updating

export default class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      color: 'gray',
      projectLoaded: false,
      projectId: null,
      socket: null,
      announcement: null,
    };
  }

  componentDidMount() {
    const uuid = this.props.route.match.params.project_id;
    let newState;

    const socket = openSocket(config.API_ENDPOINT + '/' + uuid);
    socket.on('update', (categories) => {
      this.setState({ categories });
    });
    socket.on('connection', () => {
      this.setState({ announcement: 'A user connected 👋' });
      setTimeout(() => {
        this.setState({ announcement: null });
      }, 3000);
    });
    socket.on('disconnect', () => {
      this.setState({ announcement: 'A user disconnected 🚪' });
      setTimeout(() => {
        this.setState({ announcement: null });
      }, 3000);
    });
    this.setState({ socket: socket });

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
          this.setState({ color: storedColor });
        }
      })
      .catch((err) => {
        this.setState({ error: 'Failed to fetch project' });
        console.log(err);
      });
  }

  componentDidUpdate() {
    if (this.state.showAddForm) {
      const input = document.getElementById('newCategoryName');
      input.focus();
    }
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

    this.state.socket && this.state.socket.emit('update', newState.categories);
  };

  deleteCategory = (categoryIndex) => {
    // This needs to re-index all categories higher than it

    const category_uuid = this.state.categories[categoryIndex].uuid;
    const newCategories = [...this.state.categories];
    newCategories.splice(categoryIndex, 1);
    this.setState({ categories: newCategories });

    this.state.socket.emit('update', newCategories);

    const toReIndex = this.state.categories[categoryIndex]
      ? this.state.categories
          .slice(categoryIndex)
          .map((category) => ({ id: category.uuid, index: category.index }))
      : [];

    ApiService.deleteCategory(category_uuid, toReIndex);
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

    const newCategories = [...this.state.categories];
    newCategories[categoryIndex].tasks.push(newTask);

    this.setState({ categories: newCategories });

    this.state.socket.emit('update', newCategories);

    ApiService.postTask(newTask)
      // .then((dbTask) => {
      //   // const newState = { ...this.state };
      //   // // I think this is directly mutating state via a deeply nested reference
      //   // newState.categories[categoryIndex].tasks[newTaskIndex].id = dbTask.id;
      // })
      .catch((err) => this.setState({ error: err }));
  };

  deleteTask = (categoryIndex, taskIndex) => {
    const task_uuid = this.state.categories[categoryIndex].tasks[taskIndex]
      .uuid;
    const newCategories = [...this.state.categories];
    let newTasks = newCategories[categoryIndex].tasks;

    // Remove the task from the new application state
    newTasks.splice(taskIndex, 1);
    // reIndex the tasks in our application state
    newTasks = newTasks.map((task, index) => {
      task.index = index;
      return task;
    });

    this.setState({ categories: newCategories });

    this.state.socket.emit('update', newCategories);

    // Pass the array of tasks to reIndex to our API
    const toReIndex = newTasks;
    ApiService.deleteTask(task_uuid, toReIndex);
  };

  addTag = (categoryIndex, taskIndex, newTag) => {
    const newCategories = [...this.state.categories];
    const task_uuid = newCategories[categoryIndex].tasks[taskIndex].uuid;
    const newTags = newCategories[categoryIndex].tasks[taskIndex].tags;

    newTags.push(newTag);

    this.setState({ categories: newCategories });

    this.state.socket.emit('update', newCategories);

    const newValues = {
      tags: newTags,
    };

    console.log(task_uuid, newValues);
    ApiService.patchTask(task_uuid, newValues);
  };

  deleteTag = (categoryIndex, taskIndex, tagIndex) => {
    const newCategories = [...this.state.categories];
    const task_uuid = newCategories[categoryIndex].tasks[taskIndex].uuid;
    const newTags = newCategories[categoryIndex].tasks[taskIndex].tags;

    newTags.splice(tagIndex, 1);

    this.setState({ categories: newCategories });
    this.state.socket.emit('update', newCategories);

    // Send the new tags values to the server to be updated
    const apiTags = [...newTags];
    const newValues = {
      tags: apiTags,
    };

    ApiService.patchTask(task_uuid, newValues);
  };

  updateNoteOnServer = (categoryIndex, taskIndex, newNote) => {
    const task_uuid = this.state.categories[categoryIndex].tasks[taskIndex]
      .uuid;
    const newValues = {
      notes: newNote,
    };

    ApiService.patchTask(task_uuid, newValues);
  };

  // For handling our controlled input component
  handleChangeNote = (categoryIndex, taskIndex, newNoteValue) => {
    // const newState = utils.deepCopy(this.state);
    const newCategories = [...this.state.categories];

    newCategories[categoryIndex].tasks[taskIndex].notes = newNoteValue;

    this.setState({ categories: newCategories });
    this.state.socket.emit('update', newCategories);
  };

  toggleShowAddForm = () => {
    this.setState({ showAddForm: !this.state.showAddForm });
  };

  handleChangeColor = (e) => {
    let color = e.target.value;

    this.setState({
      color,
    });
    window.localStorage.setItem(`${this.state.projectId}-color`, color);
  };

  onDragEnd = ({ source, destination, type }) => {
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'task') {
      const newCategories = [...this.state.categories];
      const fromIndex = source.index;
      const toIndex = destination.index;
      let sourceCategoryIndex;
      newCategories.forEach((category, idx) => {
        if (category.uuid === source.droppableId) {
          sourceCategoryIndex = idx;
        }
      });
      let destinationCategoryIndex;
      newCategories.forEach((category, idx) => {
        if (category.uuid === destination.droppableId) {
          destinationCategoryIndex = idx;
        }
      });

      const task = newCategories[sourceCategoryIndex].tasks.splice(
        fromIndex,
        1
      )[0];

      task.category_uuid = destination.droppableId;

      newCategories[destinationCategoryIndex].tasks.splice(toIndex, 0, task);

      // Optimistically Update the client state
      this.setState({ categories: newCategories });
      this.state.socket.emit('update', newCategories);

      const toReIndex = [
        { ...newCategories[sourceCategoryIndex] },
        { ...newCategories[destinationCategoryIndex] },
      ];

      ApiService.patchTask(task.id, task, toReIndex);
    } else if (type === 'category') {
      let newCategories = [...this.state.categories];
      const fromIndex = source.index;
      const toIndex = destination.index;

      const droppedCategory = newCategories.splice(fromIndex, 1)[0]; // Splice out the moved category
      newCategories.splice(toIndex, 0, droppedCategory); // Insert the moved category at the new index
      newCategories = newCategories.map((category, idx) => {
        return { ...category, index: idx };
      });

      // Optimistically Update the client state
      this.setState({ categories: newCategories });
      this.state.socket.emit('update', newCategories);

      const toReIndex = newCategories.map(({ uuid }) => uuid);

      ApiService.patchCategory(droppedCategory.uuid, {
        toReIndex,
      });
    }
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

    return (
      <section className='project'>
        <ProjectHeader
          handleChangeColor={this.handleChangeColor}
          uuid={this.state.uuid}
        ></ProjectHeader>

        {/* Error Display */}
        {this.state.error ? (
          <div className='project__error'>
            <h2>{this.state.error}</h2>
          </div>
        ) : null}

        {this.state.announcement && (
          <Announcement message={this.state.announcement} />
        )}

        {/* Kanban Board */}
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable
            droppableId='categories'
            direction='horizontal'
            type='category'
          >
            {(provided) => (
              <div
                className='project__board'
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {/* DragDrop Context callbacks: onDragStart, onDragUpdate, onDragEnd(required) */}
                {this.state.categories &&
                  this.state.categories.map((category, idx) => (
                    <Category
                      key={category.uuid}
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
                      color={this.state.color}
                    />
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

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
            <h2>↖ Create your first category to get started</h2>
          </div>
        ) : null}
      </section>
    );
  }
}

// for each category on this project, render a category component
