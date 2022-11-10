/**
 * main function for summary section
 */
async function initTasks() {
  await init();
  greetingMobile();
  quantityTasks();
  deadlineChecker();
}

/**
 * function that shows a greeting message for the logged User
 */
function greetingMobile() {
  if (window.innerWidth < 800) {
    getId('greeting').innerHTML = createGreeting();
    let name = users.find((n) => n.logStatus == 'loggedIn');
    if (name != undefined) {
      getId('loggedInUser').innerHTML = `${name.userName}`;
    }
    getId('greeting').classList.add('greetingMobile', 'fade-out');
    setTimeout(() => {
      getId('greeting').style.display = 'none';
    }, 2000);
  }
}

/**
 * function that filters all tasks by theier status for the respectively container
 */
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

/**
 *
 * @param {container where the tasks should be rendered} todo
 * @param {container where the tasks should be rendered} inProgress
 * @param {container where the tasks should be rendered} awaitingFeedback
 * @param {container where the tasks should be rendered} done
 * @param {urgentContainer} urgent
 */
function setQuantity(todo, inProgress, awaitingFeedback, done, urgent) {
  getId('tasksInBoard').innerHTML = allTasks.length;
  getId('toDo').innerHTML = todo.length;
  getId('tasksInProgress').innerHTML = inProgress.length;
  getId('feedBack').innerHTML = awaitingFeedback.length;
  getId('done').innerHTML = done.length;
  getId('nrOfUrgent').innerHTML = urgent.length;
}

/**
 * checking the nearest coming deadline off allTasks
 */
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

/**
 *
 * @returns  a minimum date
 */
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

/**
 *
 * @param {date which has to be converted into a timestamp} date
 * @returns
 */
function convertTimetoTimestamp(date) {
  let newDate = new Date(date);
  return newDate.getTime();
}

/**
 *
 * @param {minimum date that will be converted into a string} allTasksDatesMinimum
 * @returns
 */
function convertTimetoString(allTasksDatesMinimum) {
  return new Date(allTasksDatesMinimum);
}
