import { createAction } from '@reduxjs/toolkit';

import ActionNames from 'Constants/actionNames';

export const getRequestAction = <P = undefined>(name: ActionNames) => createAction<P>(`${name}_REQUEST`);

export const getSuccessAction = <P = undefined>(name: ActionNames) => createAction<P>(`${name}_SUCCESS`);

export const getFailureAction = <P = undefined>(name: ActionNames) => createAction<P>(`${name}_FAILURE`);
