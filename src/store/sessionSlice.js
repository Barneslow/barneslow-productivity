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

export const fetchSessionAction = createAsyncThunk(
  "session/session",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const user = getState().authentication;

    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.get(`${baseUrl}/api/sessions/${id}`, config);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const createSessionAction = createAsyncThunk(
  "session/create",
  async (session, { rejectWithValue, getState, dispatch }) => {
    const user = getState().authentication;

    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${baseUrl}/api/sessions/`,
        session,
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateSessionAction = createAsyncThunk(
  "session/update",
  async (updatedSession, { rejectWithValue, getState, dispatch }) => {
    const user = getState().authentication;

    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
        "Content-Type": "application/json",
      },
    };

    console.log(updatedSession);

    try {
      const { data } = await axios.post(
        `${baseUrl}/api/sessions/${updatedSession.id}`,
        updatedSession,
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteSessionAction = createAsyncThunk(
  "session/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const user = getState().authentication;

    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.delete(
        `${baseUrl}/api/sessions/${id}`,
        config
      );

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

    builder.addCase(fetchSessionAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchSessionAction.fulfilled, (state, action) => {
      state.session = action.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchSessionAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    builder.addCase(createSessionAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(createSessionAction.fulfilled, (state, action) => {
      state.session = action.payload;
      state.sessions = [...state.sessions, action.payload];
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(createSessionAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });
    builder.addCase(updateSessionAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(updateSessionAction.fulfilled, (state, action) => {
      state.updatedSession = action.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(updateSessionAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    builder.addCase(deleteSessionAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(deleteSessionAction.fulfilled, (state, action) => {
      state.deleteSession = null;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(deleteSessionAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });
  },
});

export default sessionSlice;
