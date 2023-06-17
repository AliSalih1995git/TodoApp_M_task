import React, { useState } from "react";
import "./style.css";

function AddTodo() {
  const [todo, setTodo] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(todo, description);
  };
  return (
    <div className="todoForm">
      <h1 className="title">Add Todos</h1>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <label>Description (optional)</label>
        <textarea
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add </button>
      </form>
    </div>
  );
}

export default AddTodo;
