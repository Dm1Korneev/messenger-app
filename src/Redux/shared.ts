import { createAction } from '@reduxjs/toolkit';

export const getRequestAction = (name: string) => createAction(`${name}_REQUEST`);

export const getSuccessAction = (name: string) => createAction(`${name}_SUCCESS`);

export const getFailureAction = (name: string) => createAction(`${name}_FAILURE`);
