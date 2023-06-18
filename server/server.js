const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// const { Client } = require("@elastic/elasticsearch");
require("dotenv").config();
const routes = require("./routes/todoRoutes");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

// Create ElasticSearch client
// const elasticClient = new Client({
//   node: "http://localhost:9200",
// });
//DB setup
mongoose.set("strictQuery", false);
const connectDatabase = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
    })
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.log("Error connecting to mongodb", err));
};
connectDatabase();

//server setup
const port = process.env.PORT || 5051;
app.listen(port, () => console.log(`Server running at port ${port}`));
