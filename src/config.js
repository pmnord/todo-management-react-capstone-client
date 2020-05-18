export default {
    API_ENDPOINT: process.env.REACT_APP_ENV === "development"
        ? `http://localhost:8000/api`
        : process.env.REACT_APP_WEDO_SERVER,
    API_KEY: process.env.REACT_APP_WEDO_API_KEY,
}