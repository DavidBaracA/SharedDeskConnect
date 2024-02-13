const initialState = {
  isLoggedIn: false,
  currentUser: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLoggedIn: true, currentUser: action.payload };
    case "LOGOUT":
      return { ...state, isLoggedIn: false,  currentUser:"" };
    default:
      return state;
  }
}

export default reducer;
