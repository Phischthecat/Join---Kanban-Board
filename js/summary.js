async function initTasks() {
  await init();
  quantityTasks();
  deadlineChecker();
  greetingMobile();
  setUser();
}

function greetingMobile() {
  if (window.innerWidth < 800) {
    document
      .querySelector('.greeting')
      .classList.add('greetingMobile', 'fade-out');
    setTimeout(() => {
      document.querySelector('.greeting').style.display = 'none';
    }, 2000);
  }
}

function setUser() {
  let name = users.find((n) => n.logStatus == 'loggedIn');
  if (name != undefined) {
    getId('loggedInUser').innerHTML = `${name.userName}`;
  } else {
    getId('guest').innerHTML = 'Good morning';
    getId('loggedInUser').innerHTML = ``;
  }
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
  if (allTasks.length > 0) {
    let allTasksDatesMinimum = findingMinimumDate();
    let date = convertTimetoString(allTasksDatesMinimum);

    deadlineDate.innerHTML =
      date.toLocaleString('default', { month: 'long' }) +
      ' ' +
      date.getDate() +
      ', ' +
      date.getFullYear();
  } else {
    deadlineDate.innerHTML = 'No tasks';
  }
}

function findingMinimumDate() {
  if (allTasks.length > 0) {
    let min = convertTimetoTimestamp(allTasks[0].dueDate);
    for (let i = 1; i < allTasks.length; i++) {
      let value = convertTimetoTimestamp(allTasks[i].dueDate);
      min = value < min ? value : min;
    }
    return min;
  } else {
    return '';
  }
}

function convertTimetoTimestamp(date) {
  let newDate = new Date(date);
  return newDate.getTime();
}

function convertTimetoString(allTasksDatesMinimum) {
  return new Date(allTasksDatesMinimum);
}
