async function initTasks() {
  await init();
  quantityTasks();
  deadlineChecker();
}

function quantityTasks() {
  let todo = allTasks.filter((a) => a['status'] == 'toDo');
  let inProgress = allTasks.filter((a) => a['status'] == 'inProgress');
  let awaitingFeedback = allTasks.filter(
    (a) => a['status'] == 'awaitingFeedback'
  );
  let done = allTasks.filter((a) => a['status'] == 'done');
  let urgent = allTasks.filter((a) => a['priority'] == 'urgent');
  setQuantity(todo, inProgress, awaitingFeedback, done, urgent);
}

function setQuantity(todo, inProgress, awaitingFeedback, done, urgent) {
  getId('tasksInBoard').innerHTML = allTasks.length;
  getId('toDo').innerHTML = todo.length;
  getId('tasksInProgress').innerHTML = inProgress.length;
  getId('feedBack').innerHTML = awaitingFeedback.length;
  getId('done').innerHTML = done.length;
  getId('nrOfUrgent').innerHTML = urgent.length;
}

function deadlineChecker() {
  let deadlineDate = getId('dateOfDeadline');
  let allTasksDatesMinimum = findingMinimumDate();
  let date = convertTimetoString(allTasksDatesMinimum);

  deadlineDate.innerHTML =
    date.toLocaleString('default', { month: 'long' }) +
    ' ' +
    date.getDate() +
    ', ' +
    date.getFullYear();
}

function findingMinimumDate() {
  let min = convertTimetoTimestamp(allTasks[0].dueDate);

  for (let i = 1; i < allTasks.length; i++) {
    let value = convertTimetoTimestamp(allTasks[i].dueDate);
    min = value < min ? value : min;
  }
  return min;
}

function convertTimetoTimestamp(date) {
  let newDate = new Date(date);
  return newDate.getTime();
}

function convertTimetoString(allTasksDatesMinimum) {
  return new Date(allTasksDatesMinimum);
}
