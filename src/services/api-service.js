import config from '../config';

const ApiService = {
    postProject: function () {
        // Returns a new project UUID, to be associated with a path by the client
        return fetch(`${config.API_ENDPOINT}/project`, {
            method: 'POST',
            headers: {
                'api-key': config.API_KEY,
            }
        })
            .then(res => res.ok
                ? res.json()
                : res.json().then(err => Promise.reject(err)))
            .then(uuid => uuid)
            .catch(err => console.log(err));
    },
    getProjectObject: function (uuid) {
        return fetch(`${config.API_ENDPOINT}/project/${uuid}`, {
            headers: {
                'api-key': config.API_KEY,
            }
        })
            .then(res => res.ok
                ? res.json()
                : res.json().then(err => Promise.reject(err)))
            .catch(err => console.log(err));
    },
    postCategory: function (newCategory) {
        return fetch(`${config.API_ENDPOINT}/category`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'api-key': config.API_KEY
            },
            body: JSON.stringify(newCategory),
        })
            .then(res => res.ok
                ? res.json()
                : res.json().then(err => Promise.reject(err)))
            .catch(err => console.log(err));
    },
    deleteCategory: function (category_id, toReIndex) {
        return fetch(`${config.API_ENDPOINT}/category/${category_id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'api-key': config.API_KEY
            },
            body: JSON.stringify({ toReIndex })
        })
            .then(res => res.ok
                ? null
                : res.json().then(err => Promise.reject(err)))
            .catch(err => console.log(err));
    },
    postTask: function (newTask) {
        return fetch(`${config.API_ENDPOINT}/task`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'api-key': config.API_KEY
            },
            body: JSON.stringify(newTask),
        })
            .then(res => res.ok
                ? res.json()
                : res.json().then(err => Promise.reject(err)))
            .catch(err => console.log(err));
    },
    deleteTask: function (task_id, toReIndex = []) {
        // We have to re-index all tasks higher than the target
        // toReIndex: an array of task_ids to have their index decremented by 1
        return fetch(`${config.API_ENDPOINT}/task/${task_id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'api-key': config.API_KEY
            },
            body: JSON.stringify({ toReIndex }),
        })
            .then(res => res.ok
                ? res.json()
                : res.json().then(err => Promise.reject(err)))
            .catch(err => console.log(err));

    },
    patchTask: function (task_id, newValues, swapee) {
        // Handles movement(maybe), tag updates, and note updates
        // swapee: the task_id to swap indexes with on vertical moves
        if (swapee) {
            newValues.swapee = swapee;
        }

        return fetch(`${config.API_ENDPOINT}/task/${task_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'api-key': config.API_KEY
            },
            body: JSON.stringify(newValues),
        })
    }
}

export default ApiService;