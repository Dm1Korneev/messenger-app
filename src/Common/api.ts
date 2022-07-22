
import { apiCall } from './apiCall';

type API = <T>(URI: string, optionsParams: RequestInit, token?: string) => Promise<T>

type APIGet = <T>(URI: string, token?: string) => Promise<T>

const get: APIGet = async (URI, token) => apiCall(URI, { method: 'GET' }, token);

const put: API = async (URI, optionsParams, token) => apiCall(URI, { ...optionsParams, method: 'PUT' }, token);

const post: API = async (URI, optionsParams, token) => apiCall(URI, { ...optionsParams, method: 'POST' }, token);

export const api = {
  get,
  put,
  post,
};
