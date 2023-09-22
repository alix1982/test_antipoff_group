import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk (
  'users/fetchUsers',
  async function (page = 1) {
    const response = await fetch(`https://reqres.in/api/users?page=${page}`);
      if (!response.ok) {
        throw new Error('Server error!');
      }
      const data = await response.json();
      return data;
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    user: {},
    page: 1,
    isButtonMore: false,
    status: null,
    error: null,
    widthWindow: 0,
  },
  reducers: {
    resetUsers (state) {
      state.users = [];
      state.page = 1;
    },
    findUser (state, action) {
      state.user = state.users.find((item)=> String(item.id) === String(action.payload.id))
    },
    setWidthWindow (state) {
      state.widthWindow = window.outerWidth;
    },
    setLike (state, action) {
      const card = state.users.find(item => item.id === action.payload);
      card.like = !card.like;
      localStorage.setItem('arrUsers', JSON.stringify(state.users));
    },     
    checkUsers (state) {
      if (JSON.parse(localStorage.getItem('arrUsers')) !== null) {
        state.users = JSON.parse(localStorage.getItem('arrUsers'));
        state.isButtonMore = JSON.parse(localStorage.getItem('isButtonMore'));
        state.page = JSON.parse(localStorage.getItem('page'));
      };
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.page = action.payload.page;
      (action.payload.page < action.payload.total_pages) ? state.isButtonMore = true : state.isButtonMore = false;
      const newUsers = action.payload.data;
      newUsers.map(item => item.like = false)
      state.users.push(...newUsers);
      state.page = state.page + 1;
      localStorage.setItem('isButtonMore', JSON.stringify(state.isButtonMore));
      localStorage.setItem('arrUsers', JSON.stringify(state.users));
      localStorage.setItem('page', JSON.stringify(state.page));
    },
    [fetchUsers.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.error.message;
    }
  },
});

export const { resetUsers, findUser, setWidthWindow, setLike, checkUsers } = usersSlice.actions;
export default usersSlice.reducer;