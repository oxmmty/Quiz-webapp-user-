function categoryReducer(category, action) {
  switch (action.type) {
    // eslint-disable-next-line no-lone-blocks
    case "SET_CATEGORY": {
      return (category = action.payload);
    }
    default: {
      throw Error("Unknown Action" + action.type);
    }
  }
}

export default categoryReducer;
