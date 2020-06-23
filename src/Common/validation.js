import * as Yup from 'yup';

export const name = Yup.string()
  .min(2)
  .max(50)
  .required();

export const email = Yup.string()
  .email()
  .required();

export const password = Yup.string()
  .min(6)
  .required();
