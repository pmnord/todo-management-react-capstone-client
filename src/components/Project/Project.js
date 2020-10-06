import React from 'react';
import utils from '../../utils/utils';
import ApiService from '../../services/api-service';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import './project.css';

import Category from '../Category/Category.js';
import AddButton from '../AddButton/AddButton';
import ProjectHeader from '../ProjectHeader/ProjectHeader';

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
          this.setState({ color: storedColor });
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
      const newState = { ...this.state };
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

      // Optimistically Update the client state
      this.setState(newState);

      const toReIndex = [
        { ...newState.categories[sourceCategoryIndex] },
        { ...newState.categories[destinationCategoryIndex] },
      ];

      ApiService.patchTask(task.id, task, toReIndex);
    } else if (type === 'category') {
      const newCategories = [...this.state.categories];
      const fromIndex = source.index;
      const toIndex = destination.index;

      const droppedCategory = newCategories.splice(fromIndex, 1)[0]; // Splice out the moved category
      newCategories.splice(toIndex, 0, droppedCategory); // Insert the moved category at the new index

      // Optimistically Update the client state
      this.setState({ categories: newCategories });

      ApiService.patchCategory(droppedCategory.id, {
        toReIndex: newCategories,
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
