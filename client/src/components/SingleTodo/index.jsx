import React from "react";
import "./style.css";
// import axios from "axios";
// import { toast } from "react-toastify";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";

function SingleTodo({ title, description, id, handleDelete }) {
  // const navigate = useNavigate();
  // const BackendURL =
  //   process.env.REACT_APP_BACKEND_URL || "http://localhost:5051";

  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <p className="card-description">{description}</p>
      <div className="card-icons">
        <Link to={`/addTodo/${id}`}>
          <AiFillEdit size={28} />
        </Link>
        <AiFillDelete size={28} onClick={() => handleDelete(id)} />
      </div>
    </div>
  );
}

export default SingleTodo;
