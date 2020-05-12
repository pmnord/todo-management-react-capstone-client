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
            .then(data => data.uuid)
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
    deleteCategory: function (category_id) {
        return fetch(`${config.API_ENDPOINT}/category/${category_id}`, {
            method: 'DELETE',
            headers: {
                'api-key': config.API_KEY
            }
        })
        .then(res => res.ok
            ? null
            : res.json().then(err => Promise.reject(err)))
        .catch(err => console.log(err));
    }
}

export default ApiService;