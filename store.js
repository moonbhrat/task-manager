const tasks = [];   // store tasks
let nextId  = 1;    // auto id


// find index by id (linear search dsa )
function findIndexById(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) return i;
  }
  return -1;
}


// newwww task
function create(title, description) {
  const newTask = {
    id: nextId++,
    title,
    description: description || "",
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask); // last me add karo
  return newTask;
}


// get all tasks (copy)
function getAll() {
  return [...tasks]; 
}


// get task by id
function getById(id) {
  const index = findIndexById(id);
  return index === -1 ? null : tasks[index];
}


// update task data
function update(id, data) {
  const index = findIndexById(id);
  if (index === -1) return null;

  if (data.title !== undefined) tasks[index].title = data.title;
  if (data.description !== undefined) tasks[index].description = data.description;

  return tasks[index];
}


// taslkk dne
function markDone(id) {
  const index = findIndexById(id);
  if (index === -1) return null;

  tasks[index].status = "done";
  return tasks[index];
}


// remove task
function remove(id) {
  const index = findIndexById(id);
  if (index === -1) return false;

  tasks.splice(index, 1); // delete
  return true;
}


// filter by status
function filterByStatus(status) {
  return tasks.filter(task => task.status === status);
}


// sort by dte
function sortByCreatedAt(order = "asc") {
  return [...tasks].sort((a, b) => {
    const diff = new Date(a.createdAt) - new Date(b.createdAt);
    return order === "asc" ? diff : -diff;
  });
}


// stats (total, done, pending)
function getStats() {
  return tasks.reduce(
    (acc, task) => {
      acc.total++;
      task.status === "done" ? acc.done++ : acc.pending++;
      return acc;
    },
    { total: 0, pending: 0, done: 0 }
  );
}


// export
module.exports = {
  getAll,
  getById,
  create,
  update,
  markDone,
  remove,
  filterByStatus,
  sortByCreatedAt,
  getStats,
};