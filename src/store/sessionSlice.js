import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../config/baseUrl";

export const fetchUserSessionsAction = createAsyncThunk(
  "session/sessions",
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
      const { data } = await axios.get(`${baseUrl}/api/sessions/`, config);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const sessionSlice = createSlice({
  name: "session",
  initialState: {},

  extraReducers: (builder) => {
    builder.addCase(fetchUserSessionsAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchUserSessionsAction.fulfilled, (state, action) => {
      state.sessions = action.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchUserSessionsAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });
  },
});

export default sessionSlice;
