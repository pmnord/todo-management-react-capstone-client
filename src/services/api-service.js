import config from '../config';

const ApiService = {
    createProject: function () {
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
}

export default ApiService;