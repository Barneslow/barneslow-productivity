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

export const fetchTaskAction = createAsyncThunk(
  "task/findTask",
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
      const { data } = await axios.get(`${baseUrl}/api/tasks/${id}`, config);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const createTaskAction = createAsyncThunk(
  "task/create",
  async (task, { rejectWithValue, getState, dispatch }) => {
    const user = getState().authentication;

    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(`${baseUrl}/api/tasks/`, task, config);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateTaskAction = createAsyncThunk(
  "task/update",
  async (updatedTask, { rejectWithValue, getState, dispatch }) => {
    const user = getState().authentication;

    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/tasks/`,
        updatedTask,
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

export const deleteTaskAction = createAsyncThunk(
  "task/delete",
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
      const { data } = await axios.delete(`${baseUrl}/api/tasks/${id}`, config);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const newTasksArr = (state, payload) => {
  const newArr = state.filter((task) => {
    return task.id !== payload.id;
  });

  return newArr;
};

const udpatedTaskArr = (state, payload) => {
  const newArr = state.map(
    (obj) => [payload].find((o) => o.id === obj.id) || obj
  );

  return newArr;
};

const taskSlice = createSlice({
  name: "task",
  initialState: { task: {}, tasks: [] },

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

    builder.addCase(fetchTaskAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchTaskAction.fulfilled, (state, action) => {
      state.task = action.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchTaskAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    builder.addCase(createTaskAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(createTaskAction.fulfilled, (state, action) => {
      state.task = action.payload;
      state.tasks = [...state.tasks, action.payload];
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(createTaskAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    builder.addCase(updateTaskAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(updateTaskAction.fulfilled, (state, action) => {
      state.updatedTask = action.payload;
      state.tasks = udpatedTaskArr(state.tasks, action.payload);
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(updateTaskAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    builder.addCase(deleteTaskAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(deleteTaskAction.fulfilled, (state, action) => {
      state.deletedTask = null;
      state.tasks = newTasksArr(state.tasks, action.payload);
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(deleteTaskAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });
  },
});

export default taskSlice;
