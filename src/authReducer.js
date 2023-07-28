const initialState = {
  isLoggedIn: false,
  userName: null,
  userId: null,
  serverUrl: "https://my-json-server.typicode.com/RadCzu/RC-Reactjs-Server"
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        userName: action.payload.userName,
        userId: action.payload.userId,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        userName: null,
        userId: null,
      };
    default:
      return state;
  }
};

export default authReducer;