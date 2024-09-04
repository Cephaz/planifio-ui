import {LoginCredentials} from '../types';

const API_URL = 'http://localhost:3000';

function encodeLogin(data: LoginCredentials): string {
  return Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

export const loginUser = async (credentials: LoginCredentials): Promise<{accessToken: string}> => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: encodeLogin(credentials),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
};

export const logoutUser = async (accessToken: string | null): Promise<void> => {
  const response = await fetch(`${API_URL}/users/logout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }
};
