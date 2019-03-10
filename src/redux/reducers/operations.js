export function objectsAdd(state, payload) {
  const data = Array.isArray(payload) ? payload : [payload];

  const byId = { ...state.byId };
  data.forEach(element => {
    byId[element._id] = { ...byId[element._id], ...element };
  });
  const allIds = Object.keys(byId);
  return { byId, allIds };
}
