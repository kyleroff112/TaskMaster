import apiUtils, { API_BASE_URL } from './apiUtils';

const BASE_URL = `${API_BASE_URL}/users`;

export const userService = {
  getAll,
  getById,
  create,
  update,
  remove
};

function getAll() {
  return apiUtils.get(BASE_URL);
}

function getById(id) {
  return apiUtils.get(`${BASE_URL}/${id}`);
}

function create(user) {
  return apiUtils.post(BASE_URL, user);
}

function update(id, user) {
  return apiUtils.put(`${BASE_URL}/${id}`, user);
}

function remove(id) {
  return apiUtils.delete(`${BASE_URL}/${id}`);
}
