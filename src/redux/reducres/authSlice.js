import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userInfo: {
    token: null,
    userData: null,
  },
  isFirstTimeUser: true,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userData: (state, action) => {
      state.userInfo.userData = action.payload;
    },
    userToken: (state, action) => {
      state.userInfo.token = action.payload;
    },
    setOnboarding: (state, action) => {
      state.isFirstTimeUser = action.payload;
    },
  },
});

export const {userData, setOnboarding, userToken} = authSlice.actions;
export default authSlice.reducer;
