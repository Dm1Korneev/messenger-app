export function objectsAdd<StateType, PayloadType>(
  state: { byId: Record<string, PayloadType> },
  payload: { _id: string }[],
) {
  const data = Array.isArray(payload) ? payload : [payload];

  const byId = { ...state.byId };
  data.forEach((element) => {
    byId[element._id] = { ...byId[element._id], ...element };
  });
  const allIds = Object.keys(byId);
  return { byId, allIds };
}
