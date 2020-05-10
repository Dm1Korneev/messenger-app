import * as sessionSelectors from './session';
import { notCurrentUsersSelector, usersByIdSelector } from './users';

describe('users selectors', () => {
  const store = {
    users: {
      byId: { id1: { _id: 'id1' }, id2: { _id: 'id2' }, id3: { _id: 'id3' } },
      allIds: ['id1', 'id2', 'id3'],
    },
  };

  test('notCurrentUsersSelector should return array of not current users', () => {
    jest.spyOn(sessionSelectors, 'currentUserIdSelector').mockReturnValue('id2');

    expect(notCurrentUsersSelector(store)).toStrictEqual(
      [{ _id: 'id1' }, { _id: 'id3' }],
    );
  });

  test('usersByIdSelector should return users by Id', () => {
    expect(usersByIdSelector(store)).toStrictEqual(
      { id1: { _id: 'id1' }, id2: { _id: 'id2' }, id3: { _id: 'id3' } },
    );
  });
});
