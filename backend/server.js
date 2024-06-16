const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cron = require("node-cron");
const taskRoutes = require("./routes/taskRoutes");
const sequelize = require("./config/database");
const { refreshRecurringTask } = require("./controllers/taskController");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/", infoRoutes);
app.use("/api", taskRoutes);

// cron job to refresh recurring tasks at midnight
cron.schedule("0 0 * * *", async () => {
  try {
    await refreshRecurringTask();
    console.log("Recurring tasks refreshed successfully");
  } catch (error) {
    console.error("Error refreshing recurring tasks:", error);
  }
});

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
