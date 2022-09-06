import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../config/baseUrl";

export const fetchAllUsersAction = createAsyncThunk(
  "user/users",
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
      const { data } = await axios.get(`${baseUrl}/api/users/`, {}, config);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchUserAction = createAsyncThunk(
  "user/userData",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/users/${id}`,
        {},
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

export const fetchViewUserAction = createAsyncThunk(
  "user/viewUser",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/users/view-user/${id}`,
        {},
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

export const updateUserAction = createAsyncThunk(
  "user/update",
  async (updatedUser, { rejectWithValue, getState, dispatch }) => {
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
        `${baseUrl}/api/users/${userAuth?._id}`,
        updatedUser,
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

export const updateUserPassword = createAsyncThunk(
  "user/update-password",
  async (password, { rejectWithValue, getState, dispatch }) => {
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
        `${baseUrl}/api/users/update-password`,
        password,
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

export const uploadProfilePhoto = createAsyncThunk(
  "user/upload-profile-photo",
  async (image, { rejectWithValue, getState, dispatch }) => {
    const user = getState().authentication;
    const { userAuth } = user;

    console.log(image);

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const formData = new FormData();

      formData.append("image", image);

      const { data } = await axios.post(
        `${baseUrl}/api/users/upload-profile-photo`,
        formData,
        config
      );

      return data;
    } catch (error) {
      console.log(error);

      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {},

  extraReducers: (builder) => {
    builder.addCase(fetchAllUsersAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchAllUsersAction.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchAllUsersAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    builder.addCase(fetchUserAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchUserAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    builder.addCase(fetchViewUserAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchViewUserAction.fulfilled, (state, action) => {
      state.viewedUser = action.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchViewUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    builder.addCase(updateUserAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(updateUserAction.fulfilled, (state, action) => {
      state.updatedUser = action.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(updateUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    builder.addCase(updateUserPassword.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(updateUserPassword.fulfilled, (state, action) => {
      state.updatedPassword = action.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(updateUserPassword.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });
  },
});

export default userSlice;
