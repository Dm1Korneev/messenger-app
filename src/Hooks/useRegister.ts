import { useMutation } from '@tanstack/react-query';

import { api, getFormDataBody } from 'Common';
import { useSessionContext } from 'Components/SessionProvider';
import { MESSAGES_API_URL } from 'Constants';

export type UseRegisterPayload = {
  email: string,
  password: string, name: string, avatar?: Blob, saveToStore: boolean
}

export const useRegister = () => {
  const { saveToken } = useSessionContext();
  return useMutation<
    { token: string },
    unknown, UseRegisterPayload>(({
      email, password, name, avatar,
    }) => api.post(`${MESSAGES_API_URL}/register`, getFormDataBody({
      email, password, name, avatar,
    })), {
      onSuccess: ({ token }, { saveToStore }) => {
        saveToken({ token, saveToStore });
      },
    });
};
