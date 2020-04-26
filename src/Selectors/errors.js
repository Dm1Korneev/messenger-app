import { createSelector } from '@reduxjs/toolkit';

const errorsSelector = (state) => state.errors;

export const errorSelector = (state, type) => createSelector(
  errorsSelector,
  (errors) => errors[type],
)(state);
