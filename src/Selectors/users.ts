import { createSelector } from '@reduxjs/toolkit';

import { currentUserIdSelector } from 'Selectors/session';
import { RootState } from 'Redux/reducers';

const usersSelector = (state: RootState) => state.users;

export const notCurrentUsersSelector = (state: RootState) => createSelector(
  [usersSelector, currentUserIdSelector],
  (users, currentUserId) => users.allIds
    .filter((element) => element !== currentUserId)
    .map((value) => users.byId[value]),
)(state);

export const usersByIdSelector = (state: RootState) => createSelector(
  usersSelector,
  (users) => users.byId,
)(state);
