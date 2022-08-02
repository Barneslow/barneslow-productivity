import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../config/baseUrl";

export const fetchUserNotesAction = createAsyncThunk(
  "notes/fetchNotes",
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
      const { data } = await axios.get(`${baseUrl}/api/notes/`, config);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchSessionNotesAction = createAsyncThunk(
  "notes/sessionNotes",
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
      const { data } = await axios.get(`${baseUrl}/api/notes/${id}`, config);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const createNoteAction = createAsyncThunk(
  "notes/create",
  async (note, { rejectWithValue, getState, dispatch }) => {
    const user = getState().authentication;

    const { userAuth } = user;
    const { id, description } = note;

    console.log(id);
    console.log(description);

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${baseUrl}/api/notes/${id}`,
        { description },
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

export const deleteNoteAction = createAsyncThunk(
  "notes/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const user = getState().authentication;

    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
        "Content-Type": "application/json",
      },
      data: {
        id: id,
      },
    };

    try {
      const { data } = await axios.delete(`${baseUrl}/api/notes/${id}`, config);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const newNotesArr = (state, payload) => {
  const newArr = state.filter((note) => {
    return note._id !== payload._id;
  });

  return newArr;
};

const noteSlice = createSlice({
  name: "ui",
  initialState: { noteIsVisable: false, notes: [] },
  // reducers: {
  //   toggle(state) {
  //     state.noteIsVisable = !state.noteIsVisable;
  //   },
  //   addNote(state, action) {
  //     state.notes = action.payload;
  //   },
  // },

  extraReducers: (builder) => {
    builder.addCase(fetchUserNotesAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchUserNotesAction.fulfilled, (state, action) => {
      state.notes = action.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(fetchUserNotesAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    builder.addCase(fetchSessionNotesAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchSessionNotesAction.fulfilled, (state, action) => {
      state.sessionNotes = action.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(fetchSessionNotesAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    builder.addCase(createNoteAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(createNoteAction.fulfilled, (state, action) => {
      state.note = action.payload;
      state.sessionNotes = [...state.notes, action.payload];
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(createNoteAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    builder.addCase(deleteNoteAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(deleteNoteAction.fulfilled, (state, action) => {
      state.deletedNote = null;
      state.sessionNotes = newNotesArr(state.sessionNotes, action.payload);
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(deleteNoteAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });
  },
});

export const selectNotes = (state) => state.note.noteIsVisable;
export const selectNoteLog = (state) => state.note.notes;

export const noteActions = noteSlice.actions;

export default noteSlice;
