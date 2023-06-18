const {
  getAllTodos,
  createTodos,
  updateTodos,
  deleteTodos,
} = require("../controller/todoController");

const router = require("express").Router();

router.get("/", getAllTodos);
router.post("/create", createTodos);
router.post("/update", updateTodos);
router.post("/delete", deleteTodos);

module.exports = router;
