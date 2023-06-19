import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { toast } from "react-toastify";
import SingleTodo from "../SingleTodo";
import { Link } from "react-router-dom";

function TodoApp() {
  const BackendURL =
    process.env.REACT_APP_BACKEND_URL || "http://localhost:5051";

  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAllTodos = async () => {
    try {
      const response = await axios.get(`${BackendURL}/api`);
      setTodos(response.data);
    } catch (error) {
      console.log("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    if (searchQuery === "") fetchAllTodos();
  }, []);

  const fetchSearchTodos = async () => {
    try {
      const response = await axios.get(
        `${BackendURL}/api/search?search=${searchQuery}`
      );
      setTodos(response.data);
    } catch (error) {
      console.log("Error fetching todos:", error);
    }
  };
  useEffect(() => {
    if (searchQuery !== "") fetchSearchTodos();
  }, [searchQuery]);

  const handleDelete = async (id) => {
    console.log(id, "Delete id");
    try {
      const response = await axios.post(`${BackendURL}/api/delete`, {
        _id: id,
      });
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      fetchAllTodos();
    } catch (error) {
      console.log("Error deleting todo:", error);
    }
  };
  // console.log(todos, "todos");
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
          <input
            className="search"
            type="text"
            placeholder="Search Todos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="card-container">
          {todos.length > 0 ? (
            todos.map((td) => (
              <SingleTodo
                key={td._id}
                title={td.text}
                description={td.description}
                id={td._id}
                handleDelete={handleDelete}
              />
            ))
          ) : (
            <h5>Please Add todos ......</h5>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoApp;
