import { Reducer } from '@reduxjs/toolkit';

const errorsReducer: Reducer<Record<string, string>> = (stateProp, action) => {
  const state = stateProp ?? {};
  const { type, payload } = action;
  const matches = /(.*)_(REQUEST|FAILURE)/.exec(type);

  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return {
    ...state,
    [requestName]: requestState === 'FAILURE' ? payload?.error?.message ?? '' : '',
  };
};

export default errorsReducer;
