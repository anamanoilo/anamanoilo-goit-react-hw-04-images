const GALLERY_TYPES = {
  STATUS: 'status',
  HITS: 'hits',
  LOAD_MORE: 'loadMore',
  RESET: 'reset',
  FIRST_PAGE: 'firstPage',
};

function galleryReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case GALLERY_TYPES.STATUS:
      return { ...state, status: payload };
    case GALLERY_TYPES.HITS:
      const { page, hits, imagesData } = payload;
      if (page === 1) {
        return { ...state, hits: imagesData };
      }
      return { ...state, hits: [...hits, ...imagesData] };
    case GALLERY_TYPES.LOAD_MORE:
      return { ...state, loadMore: payload };
    case GALLERY_TYPES.RESET:
      return { ...state, hits: payload };
    default:
      throw new Error(`Unsupported action type ${type}`);
  }
}

export { GALLERY_TYPES, galleryReducer };
