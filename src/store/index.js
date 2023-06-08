import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  isLoggedIn: !!localStorage.getItem("token"),
  login: (token) => {},
  logout: () => {},
  email: localStorage.getItem("email"),
  setEmail: (email) => {},
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
      state.isLoggedIn = true;
    },
    logout(state) {
      state.token = null;
      localStorage.removeItem("token");
      state.isLoggedIn = false;
    },
    setEmail(state, action) {
      state.email = action.payload;
      localStorage.setItem("email", action.payload);
    },
  },
});

const store = configureStore({
  reducer: authSlice.reducer,
});

export const authActions = authSlice.actions;

export default store;
