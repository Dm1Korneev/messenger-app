import { Reducer } from '@reduxjs/toolkit';

const loadingReducer: Reducer<Record<string, boolean>> = (stateProp, action) => {
  const state = stateProp ?? {};
  const { type } = action;
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return {
    ...state,
    [requestName]: requestState === 'REQUEST',
  };
};

export default loadingReducer;
