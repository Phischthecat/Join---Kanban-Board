async function initTasks() {
  await init();
  // console.log(allTasks);
  quantityTasks();
  deadlineChecker();
}

function quantityTasks() {
  let tasksInBoard = document.getElementById('tasksInBoard');
  let todoBox = document.getElementById('toDo');
  let progressBox = document.getElementById('tasksInProgress');
  let feedbackBox = document.getElementById('feedBack');
  let doneBox = document.getElementById('done');

  let todo = allTasks.filter((a) => a['status'] == 'toDo');
  let inProgress = allTasks.filter((a) => a['status'] == 'inProgress');
  let awaitingFeedback = allTasks.filter(
    (a) => a['status'] == 'awaitingFeedback'
  );
  let done = allTasks.filter((a) => a['status'] == 'done');

  setQuantity(
    tasksInBoard,
    todoBox,
    progressBox,
    feedbackBox,
    doneBox,
    todo,
    inProgress,
    awaitingFeedback,
    done
  );
}

function setQuantity(
  tasksInBoard,
  todoBox,
  progressBox,
  feedbackBox,
  doneBox,
  todo,
  inProgress,
  awaitingFeedback,
  done
) {
  tasksInBoard.innerHTML += allTasks.length;
  todoBox.innerHTML += todo.length;
  progressBox.innerHTML += inProgress.length;
  feedbackBox.innerHTML += awaitingFeedback.length;
  doneBox.innerHTML += done.length;
}

function gotToBoard() {
  window.location.href = 'board.html';
}

function deadlineChecker() {
  let deadlineDate = getId('dateOfDeadline');
  let allTasksDatesMinimum = findingMinimumDate();
  let date = convertTimetoString(allTasksDatesMinimum);

  deadlineDate.innerHTML =
    date.toLocaleString('default', { month: 'long' }) +
    ' ' +
    date.getDay() +
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
