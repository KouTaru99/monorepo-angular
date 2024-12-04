declare const window: any;

export const environment = {
  production: false,
  apiUrl: window._env?.API_URL || 'http://localhost:8080/api',
  authUrl: window._env?.AUTH_URL || 'http://localhost:8080/auth',
  remoteUrl: window._env?.REMOTE_URL || 'http://localhost:4201'
};
