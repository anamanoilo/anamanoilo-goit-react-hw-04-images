const CONSTANT_TYPES = {
  SRC: 'src',
  TITLE: 'title',
  MODAL: 'modalIsShown',
  QUERY: 'query',
};

function appReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case CONSTANT_TYPES.SRC:
      return { ...state, src: payload };
    case CONSTANT_TYPES.TITLE:
      return { ...state, title: payload };
    case CONSTANT_TYPES.MODAL:
      return { ...state, modalIsShown: payload };
    case CONSTANT_TYPES.QUERY:
      return { ...state, query: payload };
    default:
      throw new Error(`Unsupported action type ${type}`);
  }
}

export { CONSTANT_TYPES, appReducer };
