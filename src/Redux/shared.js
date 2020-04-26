import { createAction } from '@reduxjs/toolkit';

export const getRequestAction = (name) => createAction(`${name}_REQUEST`);

export const getSuccessAction = (name) => createAction(`${name}_SUCCESS`);

export const getFailureAction = (name) => createAction(`${name}_FAILURE`);
