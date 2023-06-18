import React, { useEffect, useState } from "react";
import "./style.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function AddTodo() {
  const BackendURL =
    process.env.REACT_APP_BACKEND_URL || "http://localhost:5051";
  const { id } = useParams();
  const navigate = useNavigate();

  console.log(id, "ID");
  const [todo, setTodo] = useState({ text: "", description: "" });

  const fetchSingleTodo = async () => {
    try {
      const response = await axios.get(`${BackendURL}/api/${id}`);
      const { text, description } = response.data;
      setTodo({ text, description });
    } catch (error) {
      console.log("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchSingleTodo();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        const response = await axios.post(`${BackendURL}/api/update`, {
          _id: id,
          text: todo.text,
          description: todo.description,
        });
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else if (todo.text !== "") {
        const response = await axios.post(`${BackendURL}/api/create`, {
          text: todo.text,
          description: todo.description,
        });
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="todoForm">
      <h1 className="title">{id ? "Edit Todo" : "Add Todo"}</h1>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          value={todo.text}
          onChange={(e) => setTodo({ ...todo, text: e.target.value })}
        />
        <label>Description (optional)</label>
        <textarea
          type="text"
          value={todo.description}
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        />
        <button type="submit">{id ? "Edit" : "Add"}</button>
      </form>
    </div>
  );
}

export default AddTodo;
