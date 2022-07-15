import { createAction } from '@reduxjs/toolkit';

import { ActionNames } from 'Constants';

export const getRequestAction = <P = undefined>(name: ActionNames) => createAction<P>(`${name}_REQUEST`);

export const getSuccessAction = <P = undefined>(name: ActionNames) => createAction<P>(`${name}_SUCCESS`);

type FailureActionPayload = {error: Error} | undefined

export const getFailureAction = (name: ActionNames) => createAction<FailureActionPayload>(`${name}_FAILURE`);
