import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../config/baseUrl";

export const fetchUserTasksAction = createAsyncThunk(
  "task/tasks",
  async (_, { rejectWithValue, getState, dispatch }) => {
    const user = getState().authentication;

    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.get(`${baseUrl}/api/tasks/`, config);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState: {},

  extraReducers: (builder) => {
    builder.addCase(fetchUserTasksAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchUserTasksAction.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchUserTasksAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });
  },
});

export default taskSlice;
