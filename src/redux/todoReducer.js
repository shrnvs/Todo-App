import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const uniqueId = Math.floor(Math.random() * 1000);
      return [
        ...state,
        { uniqueId: uniqueId, todo: action.payload, completed: false },
      ];
    },
    deleteTodo: (state, action) => {
      return state?.filter((todo) => todo.todo !== action.payload);
    },
    editTodo: (state, action) => {
      const { uniqueId, updatedTodo } = action.payload;
      return state.map((todo) =>
        todo.uniqueId === uniqueId ? { ...todo, todo: updatedTodo } : todo
      );
    },
    handleTodoCheckboxChange: (state, action) => {
      const newState = state.map((todo) => {
        if (todo.uniqueId === action.payload) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      });

      return newState;
    },
    clearAllTodo: (state, action) => {
      if (action.payload === true) {
        return [];
      }
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  handleTodoCheckboxChange,
  editTodo,
  clearAllTodo,
} = todoSlice.actions;
export default todoSlice.reducer;
