import { createAction } from 'redux-actions';

export const getRequestAction = (name, { ...params }) => createAction(`${name}_REQUEST`)({ ...params });

export const getSuccessAction = (name, { ...params }) => createAction(`${name}_SUCCESS`)({ ...params });

export const getFailureAction = (name, { ...params }) => createAction(`${name}_FAILURE`)({ ...params });
