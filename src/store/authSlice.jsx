import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAuth = createAsyncThunk ('auth/fetchAuth',
    async function (email, password) {
      const response = await fetch('https://reqres.in/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Server error!');
      }
    }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loggedIn: false,
    status: null,
    error: null,
    textButton: 'Зарегистрироваться'
  },
  reducers: {
    exit (state) {
      localStorage.removeItem('token');
      localStorage.removeItem('arrUsers');
      localStorage.removeItem('isButtonMore');
      localStorage.removeItem('page');
      state.loggedIn = false;
    },
    checkToken (state, action) {
      (localStorage.getItem('token') !== null) && (state.loggedIn = true);
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
      state.textButton = 'Вход...'
    },
    [fetchAuth.fulfilled]: (state, action) => {
      localStorage.setItem('token', JSON.stringify(action.payload.token));
      state.status = 'resolved';
      state.loggedIn = true;
      state.textButton = 'Зарегистрироваться';
    },
    [fetchAuth.rejected]: (state, action) => {
      state.textButton = 'Зарегистрироваться';
      state.loggedIn = false;
      state.status = 'rejected';
      state.error = action.error.message;
    }
  },
});

export const {exit, checkToken} = authSlice.actions;
export default authSlice.reducer;
