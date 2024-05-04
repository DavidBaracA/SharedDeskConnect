const initialState = {
  isLoggedIn: false,
  currentUser: "",
  currentUserID: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLoggedIn: true, currentUser: action.payload.username , currentUserID: action.payload.currentId};
    case "LOGOUT":
      return { ...state, isLoggedIn: false,  currentUser:"" , currentUserID: null};
    default:
      return state;
  }
}

export default reducer;
