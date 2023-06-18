import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import SingleTodo from "../SingleTodo";

function TodoApp() {
  return (
    <div className="App">
      <div className="container">
        <h1>Todo List App</h1>
        <div className="buttonWraper">
          <Link to="/addTodo">
            <button className="addButton" type="submit">
              Add Todo
            </button>
          </Link>
          <input className="search" type="text" placeholder="Search Todos..." />
        </div>
        <div className="card-container">
          <SingleTodo />
          <SingleTodo />
        </div>
      </div>
    </div>
  );
}

export default TodoApp;
