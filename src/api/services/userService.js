const axios = require("axios");
const User = require("../../models/User");

const API_URL = 'http://localhost:5000/api'; // replace with your server's URL

const userService = {
    getAll,
    getById,
    update,
    remove,
    login,
    signup,
    logout
};

function getAll() {
    return axios.get(`${API_URL}/users`).then(handleResponse);
}

function getById(id) {
    return axios.get(`${API_URL}/users/${id}`).then(handleResponse);
}

function update(id, user) {
    return axios.put(`${API_URL}/users/${id}`, user).then(handleResponse);
}

function remove(id) {
    return axios.delete(`${API_URL}/users/${id}`).then(handleResponse);
}

function login(username, password) {
    return axios.post(`${API_URL}/users/login`, { username, password }).then(handleResponse);
}

async function signup(username, email, password) {
    const newUser = new User({
      username,
      email,
      password
    });
    await newUser.save();
    return axios.post(`${API_URL}/users/signup`, { username, email, password }).then(handleResponse);
  }
  


function logout() {
    return axios.post(`${API_URL}/logout`).then(handleResponse);
}

// handle API responses and errors
function handleResponse(response) {
    if (response.status === 401) {
        // user is not authenticated
        logout();
        window.location.reload(true);
    }

    if (!response.data.success) {
        const error = response.data.error || 'Unknown error';
        return Promise.reject(error);
    }

    return response.data.data;
}

module.exports = userService;

