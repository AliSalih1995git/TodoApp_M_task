import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoApp from "./components/TodoApp";
import AddTodo from "./components/AddTodo";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<TodoApp />} />
          <Route path="/addTodo" element={<AddTodo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
