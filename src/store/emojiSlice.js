import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../config/baseUrl";

export const fetchAllEmojisAction = createAsyncThunk(
  "emoji/fetch",
  async (_, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.get(`${baseUrl}/api/emojis/`, {}, config);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const emojiSlice = createSlice({
  name: "emoji",
  initialState: {
    emojiData: [],
    isCartOpen: false,
  },
  reducers: {
    setIsCartOpen(state) {
      state.isCartOpen = !state.isCartOpen;
    },
  },

  extraReducers: (builder) => {
    // FETCH EMOJI
    builder.addCase(fetchAllEmojisAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchAllEmojisAction.fulfilled, (state, action) => {
      state.emojisData = action.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchAllEmojisAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });
  },
});

export const emojiActions = emojiSlice.actions;

export default emojiSlice;
