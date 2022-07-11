import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "ui",
  initialState: { noteIsVisable: false, notes: [] },
  reducers: {
    toggle(state) {
      state.noteIsVisable = !state.noteIsVisable;
    },
    addNote(state, action) {
      state.notes = action.payload;
    },
  },
});

export const selectNotes = (state) => state.note.noteIsVisable;
export const selectNoteLog = (state) => state.note.notes;

export const noteActions = noteSlice.actions;

export default noteSlice;
