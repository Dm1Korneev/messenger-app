import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'Redux/reducers';

const errorsSelector = (state: RootState) => state.errors;

export const errorSelector = (state: RootState, type: string) => createSelector(
  errorsSelector,
  (errors) => errors[type],
)(state);
