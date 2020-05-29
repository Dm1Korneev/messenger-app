import { createSelector } from '@reduxjs/toolkit';

const loadingsSelector = (state) => state.loading;

export const loadingSelector = (state, type) => createSelector(
  loadingsSelector,
  (loading) => loading[type] === true,
)(state);
