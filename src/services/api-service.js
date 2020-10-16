import config from '../config';

const ApiService = {
  postProject: function () {
    // Returns a new project UUID, to be associated with a path by the client
    return fetch(`${config.API_ENDPOINT}/project`, {
      method: 'POST',
      headers: {
        'api-key': config.API_KEY,
      },
    })
      .then((res) =>
        res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
      )
      .then((uuid) => uuid)
      .catch((err) => console.log(err));
  },
  getProjectObject: function (project_uuid) {
    return fetch(`${config.API_ENDPOINT}/project/${project_uuid}`, {
      headers: {
        'api-key': config.API_KEY,
      },
    })
      .then((res) =>
        res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
      )
      .catch((err) => console.log(err));
  },
  postCategory: function (newCategory) {
    return fetch(`${config.API_ENDPOINT}/category`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'api-key': config.API_KEY,
      },
      body: JSON.stringify(newCategory),
    })
      .then((res) =>
        res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
      )
      .catch((err) => console.log(err));
  },
  deleteCategory: function (category_uuid, toReIndex) {
    return fetch(`${config.API_ENDPOINT}/category/${category_uuid}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'api-key': config.API_KEY,
      },
      body: JSON.stringify({ toReIndex }),
    })
      .then((res) =>
        res.ok ? null : res.json().then((err) => Promise.reject(err))
      )
      .catch((err) => console.log(err));
  },
  patchCategory: function (category_uuid, updateValues) {
    // updateValues must be an object with either a title property or a toReIndex property

    return fetch(`${config.API_ENDPOINT}/category/${category_uuid}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'api-key': config.API_KEY,
      },
      body: JSON.stringify(updateValues),
    });
  },
  postTask: function (newTask) {
    return fetch(`${config.API_ENDPOINT}/task`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'api-key': config.API_KEY,
      },
      body: JSON.stringify(newTask),
    })
      .then((res) =>
        res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
      )
      .catch((err) => console.log(err));
  },
  patchTask: function (task_uuid, newValues, toReIndex) {
    // Values are spread into a new object to avoid creating a circular object when we add the toReIndex array of categories
    const toApi = { ...newValues };

    // Serialize tags and notes to be stored in the database in one row.
    if (toApi.tags) {
      toApi.tags = toApi.tags
        .map((tag) => tag.replace(/\s/g, '&#32;'))
        .join(' ');
    }
    if (toApi.notes) {
      toApi.notes = toApi.notes
        .map((note) => note.replace(/\s/g, '&#32;'))
        .join(' ');
    }

    if (toReIndex) {
      toApi.toReIndex = toReIndex;
    }

    return fetch(`${config.API_ENDPOINT}/task/${task_uuid}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'api-key': config.API_KEY,
      },
      body: JSON.stringify(toApi),
    });
  },
  deleteTask: function (task_uuid, toReIndex = []) {
    // We have to re-index all tasks higher than the target
    // toReIndex: an array of task_ids to have their index decremented by 1
    return fetch(`${config.API_ENDPOINT}/task/${task_uuid}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'api-key': config.API_KEY,
      },
      body: JSON.stringify({ toReIndex }),
    })
      .then((res) =>
        res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
      )
      .catch((err) => console.log(err));
  },
};

export default ApiService;
