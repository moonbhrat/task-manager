const express = require("express");
const store   = require("../store");

const router = express.Router();

// GET /tasks?status=pending|done&sort=createdAt
router.get("/", (req, res) => {
  const { status, sort } = req.query;

  // Validate status query param
  if (status && !["pending", "done"].includes(status)) {
    return res.status(400).json({ error: "status must be 'pending' or 'done'" });
  }

  // Use store's DSA methods — filter O(n), sort O(n log n)
  let result = status
    ? store.filterByStatus(status)          // Array.filter — O(n)
    : store.getAll();                       // Shallow copy  — O(n)

  if (sort === "createdAt") {
    result = store.sortByCreatedAt("asc"); // TimSort       — O(n log n)
  }

  res.json(result);
});

// GET /tasks/stats  — bonus endpoint using getStats()
router.get("/stats", (req, res) => {
  res.json(store.getStats());             // reduce() — O(n) single pass
});

// GET /tasks/:id  — linear search O(n)
router.get("/:id", (req, res) => {
  const task = store.getById(Number(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

// POST /tasks  — array push O(1) amortized
router.post("/", (req, res) => {
  const { title, description } = req.body;
  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "title is required" });
  }
  const task = store.create(title.trim(), description);
  res.status(201).json(task);
});

// PUT /tasks/:id  — search O(n) + in-place update O(1)
router.put("/:id", (req, res) => {
  const { title, description } = req.body;
  if (title !== undefined && (typeof title !== "string" || title.trim() === "")) {
    return res.status(400).json({ error: "title cannot be empty" });
  }
  const task = store.update(Number(req.params.id), {
    title: title?.trim(),
    description,
  });
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

// PATCH /tasks/:id/done  — search O(n) + mutation O(1)
router.patch("/:id/done", (req, res) => {
  const task = store.markDone(Number(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

// DELETE /tasks/:id  — search O(n) + splice O(n)
router.delete("/:id", (req, res) => {
  const deleted = store.remove(Number(req.params.id));
  if (!deleted) return res.status(404).json({ error: "Task not found" });
  res.status(200).json({ message: "Task deleted" });
});

module.exports = router;
