export default (initialState, handlers) => (state = initialState, action = {}) => {
  if (Object.prototype.hasOwnProperty.call(action, 'type')) {
    return (handlers[action.type]
      ? handlers[action.type](state, action)
      : state);
  }

  return state;
};
