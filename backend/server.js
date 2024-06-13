const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/taskRoutes");
const sequelize = require("./config/database");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/api", taskRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
