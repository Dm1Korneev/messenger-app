import { Action } from '@reduxjs/toolkit';

export default function loadingReducer(state = {}, action: Action): Record<string, boolean> {
  const { type } = action;
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return {
    ...state,
    [requestName]: requestState === 'REQUEST',
  };
}
