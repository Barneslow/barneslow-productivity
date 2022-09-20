import axios from "axios";
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { baseUrl } from "../config/baseUrl";

export const resetAccountAction = createAction("account/reset");

export const accountVerficationResetTokenAction =
  createAction("account/resetToken");

export const loginUserAction = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/users/login`,
        userData,
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const registerUserAction = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${baseUrl}/api/users/register`,
        userData,
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const LogoutUserAction = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      localStorage.removeItem("userInfo");
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const passwordResetTokenAction = createAsyncThunk(
  "auth/reset-token",
  async (email, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${baseUrl}/api/users/forget-password-token`,
        { email },
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

export const resetPasswordAction = createAsyncThunk(
  "auth/reset",
  async (resetData, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${baseUrl}/api/users/reset-password`,
        resetData,
        config
      );
      // dispatch(resetUserPassword());

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const accountVerificationTokenAction = createAsyncThunk(
  "auth/verification-token",
  async (email, { rejectWithValue, getState, dispatch }) => {
    const auth = getState().auth;

    const { userAuth } = auth;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/users/verify-email-token`,
        {},
        config
      );

      setTimeout(() => {
        dispatch(accountVerficationResetTokenAction());
      }, 5000);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }

      return rejectWithValue(error?.response?.data);
    }
  }
);

export const accountVerifiedAction = createAsyncThunk(
  "account/verified",
  async (token, { rejectWithValue, getState, dispatch }) => {
    const auth = getState().auth;

    const { userAuth } = auth;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/users/account-verification`,
        { token },
        config
      );
      dispatch(resetAccountAction());

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }

      return rejectWithValue(error?.response?.data);
    }
  }
);

const tokenSentTimer = (state) => {
  console.log(state);

  // setTimeout((state, action) => {
  //   state.tokenSent = undefined;
  //   console.log(state.tokenSent);
  // }, 3000);
};

const userLoginFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userAuth: userLoginFromStorage,
  },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },

  extraReducers: (builder) => {
    // LOGIN USER
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth = action.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // REGISTER USER
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.userAuth = action.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // LOGOUT USER
    builder.addCase(LogoutUserAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(LogoutUserAction.fulfilled, (state, action) => {
      state.userAuth = undefined;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(LogoutUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // PASSWORD RESET TOKEN
    builder.addCase(passwordResetTokenAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(passwordResetTokenAction.fulfilled, (state, action) => {
      state.token = action.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(passwordResetTokenAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // RESET PASSWORD
    builder.addCase(resetPasswordAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(resetPasswordAction.fulfilled, (state, action) => {
      state.loading = false;
      state.passwordReset = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(resetPasswordAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // ACCOUNT VERIFICATION TOKEN

    builder.addCase(accountVerificationTokenAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(accountVerficationResetTokenAction, (state, action) => {
      state.tokenSent = undefined;
    });

    builder.addCase(
      accountVerificationTokenAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.tokenSent = action?.payload;
        state.appError = undefined;
        state.serverError = undefined;
      }
    );
    builder.addCase(
      accountVerificationTokenAction.rejected,
      (state, action) => {
        state.loading = false;
        state.appError = action?.payload?.message;
        state.serverError = action?.error?.message;
      }
    );

    // ACCOUNT VERIFICATION
    builder.addCase(accountVerifiedAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(resetAccountAction, (state, action) => {
      state.isVerfied = true;
    });

    builder.addCase(accountVerifiedAction.fulfilled, (state, action) => {
      state.loading = false;
      state.verified = action?.payload;
      state.isVerfied = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(accountVerifiedAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });
  },
});

export const selectUser = (state) => state.auth.user;

// export const selectMemoUser = createSelector([selectUser]);

export const authActions = authSlice.actions;

export default authSlice;
