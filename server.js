const express = require("express");
const cors = require("cors");
const path = require("path");
const taskRoutes = require("./routes/tasks");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/tasks", taskRoutes);

app.use((req, res, next) => {
  const allowedPaths = ["/tasks"];
  const matched = allowedPaths.some((p) => req.path.startsWith(p));
  if (matched) {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  next();
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
