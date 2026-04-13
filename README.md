# Task Manager API

A simple REST API for managing tasks. Data is stored in memory.

## Setup

```bash
npm install
npm start
```

Server runs on `http://localhost:3000`

---

## Endpoints

### POST /tasks — Create a task

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "description": "Milk, eggs, bread"}'
```

### GET /tasks — Get all tasks

```bash
curl http://localhost:3000/tasks
```

### GET /tasks?status=pending — Filter by status

```bash
curl http://localhost:3000/tasks?status=pending
curl http://localhost:3000/tasks?status=done
```

### GET /tasks?sort=createdAt — Sort by creation time

```bash
curl http://localhost:3000/tasks?sort=createdAt
```

### GET /tasks/:id — Get a task by ID

```bash
curl http://localhost:3000/tasks/1
```

### PUT /tasks/:id — Update a task

```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries and fruits"}'
```

### PATCH /tasks/:id/done — Mark as completed

```bash
curl -X PATCH http://localhost:3000/tasks/1/done
```

### DELETE /tasks/:id — Delete a task

```bash
curl -X DELETE http://localhost:3000/tasks/1
```

---

## Task Schema

```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "status": "pending",
  "createdAt": "2024-01-01T10:00:00.000Z"
}
```

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Task created |
| 400 | Bad request / missing fields |
| 404 | Task not found |
| 405 | Method not allowed |
