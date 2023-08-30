import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {
  deleteTodo,
  handleTodoCheckboxChange,
  editTodo,
  clearAllTodo,
} from "../redux/todoReducer";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

function Todos() {

  //States
  const [todosFilter, setTodosFilter] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [updatedTodoText, setUpdatedTodoText] = useState("");
  const [taskRemainingCounter, setTaskRemainingCounter] = useState(0);

  //Redux
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  //useEffect
  useEffect(() => {
    const filteredTodos = todos.filter((todo) => {
      if (filter === "completed") {
        return todo.completed;
      }
      if (filter === "notCompleted") {
        return !todo.completed;
      }
      return true;
    });

    setTodosFilter(filteredTodos);

    const tasksRemaining = todos.filter((todo) => !todo.completed);
    setTaskRemainingCounter(tasksRemaining.length);
  }, [filter, todos]);

  //Handler fucntions
  const handleDelete = (deletetodo) => {
    dispatch(deleteTodo(deletetodo));
  };
  const handleEdit = (id, todo) => {
    if (editingTodoId === id) {
      dispatch(editTodo({ uniqueId: id, updatedTodo: updatedTodoText }));
      setUpdatedTodoText("");
      setEditingTodoId(null);
    } else {
      setUpdatedTodoText(todo);
      setEditingTodoId(id);
    }
  };
  const handleCheckboxChange = (id) => {
    dispatch(handleTodoCheckboxChange(id));
  };
  const handleClearAllTodos = (value) => {
    dispatch(clearAllTodo(value));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        width: "40em",
      }}
    >
      {todos.length > 0 && (
        <div
          style={{
            display: "flex",
            margin: "10px 5px",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            style={{ marginRight: "10px" }}
            onClick={() => setFilter("all")}
          >
            Show all task
          </Button>
          <Button variant="contained" onClick={() => setFilter("notCompleted")}>
            Show active tasks
          </Button>
          <Button
            variant="contained"
            style={{ marginLeft: "10px" }}
            onClick={() => setFilter("completed")}
          >
            Show completed tasks
          </Button>
        </div>
      )}
      {todosFilter?.length > 0 && (
        <span
          style={{
            border: "#3268a8 1px solid",
            padding: "10px",
            margin: "20px auto",
            fontSize: "1.3rem",
            borderRadius: "10px",
          }}
        >
          Tasks Yet To Be Completed : {taskRemainingCounter}
        </span>
      )}

      {todosFilter?.length > 0 && (
        <>
          <>
            {todosFilter?.map((todo) => {
              return (
                <div
                  key={todo.uniqueId}
                  style={{
                    marginTop: "10px",
                    marginBottom: "10px", // Increased bottom margin
                    marginRight: "15px",
                    paddingLeft: "5%",
                    maxHeight: "auto",
                    minHeight: "50px",
                    maxWidth: "100%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Checkbox
                    checked={todo.completed}
                    onChange={() => handleCheckboxChange(todo.uniqueId)}
                    style={{
                      width: "25px",
                      maxHeight: "25px",
                      marginRight: "10px",
                    }}
                  />
                  {editingTodoId === todo.uniqueId ? (
                    <input
                      type="text"
                      value={updatedTodoText}
                      onChange={(e) => setUpdatedTodoText(e.target.value)}
                    />
                  ) : (
                    <p
                      style={{
                        fontSize: "1.5rem",
                        marginRight: "10px",
                        width: "66.66%",
                        maxWidth: "60%",
                        wordWrap: "break-word",
                        textDecoration: todo.completed && "line-through",
                      }}
                    >
                      {todo.todo}
                    </p>
                  )}
                  <Button
                    variant="outilned"
                    color="success"
                    style={{ marginRight: "10px", marginLeft: "20px" }}
                    onClick={() => handleEdit(todo.uniqueId, todo.todo)}
                  >
                    {editingTodoId &&
                    updatedTodoText &&
                    editingTodoId === todo.uniqueId
                      ? "done"
                      : "Edit"}
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    style={{ marginRight: "10px" }}
                    onClick={() => handleDelete(todo.todo)}
                  >
                    Delete
                  </Button>
                </div>
              );
            })}
          </>
        </>
      )}
      {todosFilter?.length > 0 && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <Button
            variant="contained"
            style={{ marginLeft: "10px", marginBottom: "20px" }}
            onClick={() => handleClearAllTodos(true)}
          >
            Clear all Todos
          </Button>
        </div>
      )}
    </div>
  );
}

export default Todos;
