function FindUsers(customid, users) {
  const user = users.find((user) => user.id === customid);
  return user ? user.name : null;
}

export function groupTasks(tasks, optionGroup, users) {
  if (optionGroup === "ByStatus") {
    return tasks.reduce((grouped, task) => {
      const key = task.status;

      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(task);
      return grouped;
    }, {});
  } else if (optionGroup === "ByUser") {
    return tasks.reduce((grouped, task) => {
      const key = FindUsers(task.userId, users);
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(task);
      return grouped;
    }, {});
  } else if (optionGroup === "ByPriority") {
    const priorityGroups = {};
    tasks.forEach((task) => {
      const priority = task.priority;
      if (!priorityGroups[priority]) {
        priorityGroups[priority] = [];
      }
      priorityGroups[priority].push(task);
    });
    const sortedPriorityGroups = Object.entries(priorityGroups)
      .sort(([a], [b]) => a - b)
      .reduce((sorted, [key, value]) => {
        sorted[key] = value;
        return sorted;
      }, {});
    return sortedPriorityGroups;
  }
  return {};
}
