const initialState = {
  isLoggedIn: false,
  userName: null,
  userId: null,
  // change serverUrl to : "http://localhost:8000", for the app to work locally with all features
  // run: "npm run server" in the terminal for the server to work locally, otherwise the custom json-server will not respond to "POST" requests
  //serverUrl: "https://my-json-server.typicode.com/RadCzu/RC-Reactjs-Server"
  serverUrl: "http://localhost:8000"
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