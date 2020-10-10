import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'Redux/reducers';

const loadingsSelector = (state: RootState) => state.loading;

export const loadingSelector = (state: RootState, type: string) => createSelector(
  loadingsSelector,
  (loading) => loading[type] === true,
)(state);
