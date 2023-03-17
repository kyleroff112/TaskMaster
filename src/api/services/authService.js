import { BASE_URL } from '../utils/apiUtils';

async function login(username, password) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });
  if (response.ok) {
    const user = await response.json();
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } else {
    throw new Error('Invalid username or password');
  }
}

function logout() {
  localStorage.removeItem('user');
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'));
}

export const authService = {
  login,
  logout,
  getCurrentUser
};
