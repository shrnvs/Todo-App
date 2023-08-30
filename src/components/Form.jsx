import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/todoReducer";
import { TextField, Button } from "@mui/material";

function Form({ getTodo }) {
  //States
  const [todo, setTodo] = useState("");

  //Redux
  const dispatch = useDispatch();

  //Handle functions
  const handleChange = (e) => {
    const value = e.target.value;
    setTodo(value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    if (todo.length >= 1) {
      dispatch(addTodo(todo));
      setTodo("");
    } else {
      // setError(true);
      alert("Task field cannot be empty");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "30px",
        minWidth: "40em",
      }}
    >
      <TextField
        label="Enter Todo"
        variant="outlined"
        value={todo}
        onChange={(e) => handleChange(e)}
      />
      <Button
        variant="contained"
        style={{
          marginLeft: "20px",
        }}
        onClick={(event) => handleClick(event)}
      >
        Add ToDo
      </Button>
    </div>
  );
}

export default Form;
