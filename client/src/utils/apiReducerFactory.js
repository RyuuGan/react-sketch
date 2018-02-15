export function apiReducerFactory(key, initialState = {}, map) {
  if (typeof map !== 'function') {
    map = function (action) {
      return action.response;
    };
  }

  return function (state = initialState, action) {
    switch (action.type) {
      case `${key}_REQUEST`:
        return {
          loaded: false
        };

      case `${key}_SUCCESS`:
        return {
          loaded: true,
          data: map(action)
        };

      case `${key}_FAILED`:
        return {
          loaded: true,
          error: action.error
        };

      default:
        return state
    }
  }

}
