export function getFormDataBody<P extends Record<string, string | Blob | undefined>>(payload: P): RequestInit {
  const formData = new FormData();
  const keys = Object.keys(payload) as (keyof P)[];
  keys.forEach((key: keyof P) => formData.append(String(key), payload[key] ?? 'undefined'));

  return {
    body: formData,
  };
}

