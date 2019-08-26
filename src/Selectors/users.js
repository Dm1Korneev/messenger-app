import { createSelector } from 'reselect';

import { currentUserIdSelector } from 'Selectors/session';

const usersSelector = (state) => state.users;

export const notCurrentUsersSelector = (state) => createSelector(
  [usersSelector, currentUserIdSelector],
  (users, currentUserId) => users.allIds
    .filter((element) => element !== currentUserId)
    .map((value) => users.byId[value]),
)(state);

export const usersByIdSelector = (state) => createSelector(
  usersSelector,
  (users) => users.byId,
)(state);
