import { createAction } from "redux-actions";

export const getRequestAction = (name, { ...params }) => {
  return createAction(name + "_REQUEST")({ ...params });
};

export const getSuccessAction = (name, { ...params }) => {
  return createAction(name + "_SUCCESS")({ ...params });
};

export const getFailureAction = (name, { ...params }) => {
  return createAction(name + "_FAILURE")({ ...params });
};
