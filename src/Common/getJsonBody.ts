export function getJsonBody(payload: unknown): RequestInit {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };
}

