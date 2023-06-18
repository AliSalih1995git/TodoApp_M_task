const TodoModel = require("../models/Todo");
const { client: redisClient } = require("../config/config");

//get all todos

exports.getAllTodos = async (req, res) => {
  try {
    const redisKeys = await redisClient.keys("todo:*");
    const redisValues = [];

    for (const redisKey of redisKeys) {
      const redisValue = await redisClient.get(redisKey);
      // console.log(redisValue, "redisValue");
      redisValues.push(redisValue);
    }

    let todos = redisValues.map((redisValue) => JSON.parse(redisValue));

    if (todos.length === 0) {
      todos = await TodoModel.find();

      for (const todo of todos) {
        const redisKey = `todo:${todo._id}`;
        const redisValue = JSON.stringify(todo);
        await redisClient.set(redisKey, redisValue);
      }
    }

    res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getSingleTodo = async (req, res) => {
  console.log("Enter single");
  const id = req.params.id;
  console.log(id);
  try {
    const redisKey = `todo:${id}`;
    const redisValue = await redisClient.get(redisKey);

    if (redisValue) {
      const todo = JSON.parse(redisValue);
      res.status(200).json(todo);
    } else {
      const todo = await TodoModel.findById(id);

      if (todo) {
        const redisValue = JSON.stringify(todo);
        await redisClient.set(redisKey, redisValue);
        res.status(200).json(todo);
      } else {
        res.status(404).json({ message: "Todo not found" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//create todos
exports.createTodos = async (req, res) => {
  const { text, description } = req.body;
  try {
    const todo = await TodoModel.create({ text, description });

    try {
      const redisKey = `todo:${todo._id}`;
      const redisValue = JSON.stringify(todo);
      const res = await redisClient.set(redisKey, redisValue);
      // console.log(res, "updatedTodos");
    } catch (error) {
      console.error(error);
    }

    res.status(200).json({ message: "Todo created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//update todo
exports.updateTodos = async (req, res) => {
  const { _id, text, description } = req.body;
  try {
    const todo = await TodoModel.findByIdAndUpdate(_id, { text, description });

    if (todo) {
      try {
        const redisKeys = await redisClient.keys("todo:*");
        const redisValues = [];

        for (const redisKey of redisKeys) {
          const redisValue = await redisClient.get(redisKey);
          redisValues.push(redisValue);
        }

        let todos = redisValues.map((redisValue) => JSON.parse(redisValue));

        if (todos.length === 0) {
          todos = await TodoModel.find();
        }

        const updatedTodos = todos.map((t) => {
          if (t._id.toString() === _id) {
            return { ...t, text, description };
          }
          return t;
        });

        for (const updatedTodo of updatedTodos) {
          const redisKey = `todo:${updatedTodo._id}`;
          const redisValue = JSON.stringify(updatedTodo);
          await redisClient.set(redisKey, redisValue);
        }
      } catch (error) {
        console.error(error);
      }
      res.status(200).json({ message: "Updated Successfully" });
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//delete todo
exports.deleteTodos = async (req, res) => {
  console.log("DELETE");
  const { _id } = req.body;
  try {
    const todo = await TodoModel.findByIdAndDelete(_id);

    if (todo) {
      try {
        const redisKeys = await redisClient.keys("todo:*");

        for (const redisKey of redisKeys) {
          const redisValue = await redisClient.get(redisKey);
          const parsedTodo = JSON.parse(redisValue);

          if (parsedTodo._id.toString() === _id) {
            await redisClient.del(redisKey);
            break;
          }
        }
      } catch (error) {
        console.error(error);
      }
      res.status(200).json({ message: "Deleted Successfully" });
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
