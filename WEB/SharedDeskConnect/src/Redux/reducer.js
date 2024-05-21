const initialState = {
  isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
  currentUser: localStorage.getItem('currentUser') || "",
  currentUserID: JSON.parse(localStorage.getItem('currentUserID')) || null,
  currentUserEmail: JSON.parse(localStorage.getItem('currentUserEmail')) || null,

};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      // Save login state and user info to local storage
      localStorage.setItem('isLoggedIn', JSON.stringify(true));
      localStorage.setItem('currentUser', action.payload.username);
      localStorage.setItem('currentUserID', JSON.stringify(action.payload.currentId));
      localStorage.setItem('currentUserEmail', JSON.stringify(action.payload.email));

      return { ...state, isLoggedIn: true, currentUser: action.payload.username , currentUserID: action.payload.currentId, currentUserEmail: action.payload.email};
    case "LOGOUT":
      // Clear user info from local storage on logout
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('currentUserID');
      localStorage.removeItem('currentUserEmail');

      return { ...state, isLoggedIn: false,  currentUser:"", currentUserID: null, currentUserEmail:""};
    default:
      return state;
  }
}

export default reducer;
