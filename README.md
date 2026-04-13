# Task Manager API

Hey! This is a simple Task Manager API I built using Node.js and Express.
You can create tasks, update them, mark them as done, and delete them.
No database is used — everything is stored in memory for now.

---

## How to Run

Make sure you have Node.js installed first.

```bash
npm install
npm start
```

Once it's running, the server will be available at:
**http://localhost:3000**

---

## API Endpoints

Here are all the endpoints you can use. I tested them using curl but you can use Postman too.

---

### Create a Task
**POST** `/tasks`

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "description": "Milk, eggs, bread"}'
```

> `title` is required. `description` is optional.

---

### Get All Tasks
**GET** `/tasks`

```bash
curl http://localhost:3000/tasks
```

You can also filter by status:

```bash
curl http://localhost:3000/tasks?status=pending
curl http://localhost:3000/tasks?status=done
```

Or sort by creation time:

```bash
curl http://localhost:3000/tasks?sort=createdAt
```

---

### Get a Single Task
**GET** `/tasks/:id`

```bash
curl http://localhost:3000/tasks/1
```

---

### Update a Task
**PUT** `/tasks/:id`

```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries and fruits"}'
```

---

### Mark a Task as Done
**PATCH** `/tasks/:id/done`

```bash
curl -X PATCH http://localhost:3000/tasks/1/done
```

---

### Delete a Task
**DELETE** `/tasks/:id`

```bash
curl -X DELETE http://localhost:3000/tasks/1
```

---

## What a Task Looks Like

```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "status": "pending",
  "createdAt": "2024-01-01T10:00:00.000Z"
}
```

Every task starts with `status: pending`. Once you mark it done, it changes to `done`.

---

## Status Codes

| Code | What it means |
|------|---------------|
| 200  | Everything went fine |
| 201  | Task was created successfully |
| 400  | Something was missing or wrong in the request |
| 404  | That task ID doesn't exist |
| 405  | That HTTP method isn't allowed on this route |

---

*Built by Shashank Srivastava*
