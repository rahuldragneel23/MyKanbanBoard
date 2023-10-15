export function doneTasks(tasks, optionOrder) {
  if (optionOrder === "Priority") {
    return Object.entries(tasks).sort(([keyA], [keyB]) => keyA - keyB);
  } else if (optionOrder === "Title") {
    return Object.entries(tasks).sort(([keyA, taskAs], [keyB, taskBs]) => {
      const titleA = taskAs[0].title[0].toLowerCase();
      const titleB = taskBs[0].title[0].toLowerCase();
      if (titleA < titleB) {
        return -1;
      } else {
        return 1;
      }
    });
  }
  return [];
}
