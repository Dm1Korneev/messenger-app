import { chatsArraySelector, modifiableChatSelector } from 'Selectors/chats';
import * as sessionSelectors from './session';

describe('chats selectors', () => {
  const store = {
    chats: {
      byId: { id1: { _id: 'id1' }, id2: { _id: 'id2' } },
      allIds: ['id1', 'id2'],
    },
  };

  test('chatsArraySelector should return array of chats', () => {
    expect(chatsArraySelector(store)).toStrictEqual(
      [{ _id: 'id1' }, { _id: 'id2' }],
    );
  });

  test('modifiableChatSelector should return modifiable chat', () => {
    jest.spyOn(sessionSelectors, 'modifiableChatIdSelector').mockReturnValue('id2');

    expect(modifiableChatSelector(store)).toStrictEqual(
      { _id: 'id2' },
    );
  });
});
