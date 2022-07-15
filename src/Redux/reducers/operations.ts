type StateType<PayloadType> = { byId: Record<string, PayloadType>, allIds: string[] }

export function objectsAdd<PayloadType>(
  state: StateType<PayloadType>,
  payload: { _id: string }[],
): StateType<PayloadType> {
  const data = Array.isArray(payload) ? payload : [payload];

  const byId = { ...state.byId };
  data.forEach((element) => {
    byId[element._id] = { ...byId[element._id], ...element };
  });
  const allIds = Object.keys(byId);
  return { byId, allIds };
}
