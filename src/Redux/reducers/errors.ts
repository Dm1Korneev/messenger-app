import { AnyAction } from '@reduxjs/toolkit';

export default function loadingReducer(state = {}, action: AnyAction) {
  const { type, payload } = action;
  const matches = /(.*)_(REQUEST|FAILURE)/.exec(type);

  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return {
    ...state,
    [requestName]: requestState === 'FAILURE' ? payload?.error?.message ?? '' : '',
  };
}
