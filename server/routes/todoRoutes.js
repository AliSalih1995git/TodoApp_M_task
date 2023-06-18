const {
  getAllTodos,
  createTodos,
  updateTodos,
  deleteTodos,
  getSingleTodo,
} = require("../controller/todoController");

const router = require("express").Router();

router.get("/", getAllTodos);
router.get("/:id", getSingleTodo);
router.post("/create", createTodos);
router.post("/update", updateTodos);
router.post("/delete", deleteTodos);

module.exports = router;
