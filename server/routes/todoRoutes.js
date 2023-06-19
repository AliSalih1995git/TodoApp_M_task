const {
  getAllTodos,
  createTodos,
  updateTodos,
  deleteTodos,
  getSingleTodo,
  searchTodos,
} = require("../controller/todoController");

const router = require("express").Router();

router.get("/", getAllTodos);
router.get("/getSingleTodo/:id", getSingleTodo);
router.get("/search", searchTodos);
router.post("/create", createTodos);
router.post("/update", updateTodos);
router.post("/delete", deleteTodos);

module.exports = router;
