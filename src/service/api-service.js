import jsonData from '../data.json';

const ApiService = {
    getProjectCategories: function (project_id) {
        console.log(jsonData);
        return jsonData.categories;
    },
    getCategoryTasks: function (category_id) {

    }
}

export default ApiService;