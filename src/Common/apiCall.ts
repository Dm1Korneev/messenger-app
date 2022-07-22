export const apiCall = async <T>(URI: string, { headers = {}, ...optionsParams }: RequestInit, token?: string): Promise<T> => {
  const options = {
    ...optionsParams,
    headers: {
      ...headers,
      Accept: 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
  };

  const response = await fetch(URI, options);
  const result = await response.json();
  if (!response.ok) {
    throw result;
  }
  return result;
};
