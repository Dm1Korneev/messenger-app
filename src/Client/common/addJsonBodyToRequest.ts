export function addJsonBodyToRequest(options: RequestInit, bodyObject: Record<string, unknown>) {
  return {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyObject),
  };
}
