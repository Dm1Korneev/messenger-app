export function getFormDataBody<P extends Record<string, string[] | string | Blob | undefined>>(payload: P): RequestInit {
  const formData = new FormData();
  const keys = Object.keys(payload) as (keyof P)[];
  keys.forEach((key: keyof P) => {
    const value = payload[key];
    if (Array.isArray(value)) {
      value.forEach((value) => formData.append(`${String(key)}[]`, value));
    } else {
      formData.append(String(key), value ?? 'undefined');
    }
  });

  return {
    body: formData,
  };
}

