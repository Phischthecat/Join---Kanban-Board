let allTasks = [];
let urgency;

/**
 * This Function is a simplified spelling for document.getElementById
 * @param {string} theId is used for the actual Id
 * @returns document.getElementById();
 */
function getId(theId) {
  return document.getElementById(theId);
}

/**
 * This function is used to return the ids and/or values of the input fields for the current task
 */
function getValuesForTasks() {
  let title = getId('taskTitle');
  let description = getId('taskDescription');
  let category = getId('taskCategory');
  let dueDate = getId('taskDueDate');
  let createdDate = new Date().getTime(); //only text-format could be safed in storage --> change object to getTime (UnixTimestamp since 01.01.1970)
  let specificId = new Date().getTime();
  let assignedTo = getId('assignedToPeople');
  let priority = '';
  return [
    title,
    category,
    description,
    dueDate,
    createdDate,
    assignedTo,
    specificId,
    priority,
  ];
}

/**
 * This function is used to create the Task and add it to the storage
 *  * @param {string} taskStatus -- after creating a task the user is asked to push the task into backlog or toDo
 */
function addTask(taskStatus) {
  [
    title,
    category,
    description,
    dueDate,
    createdDate,
    assignedTo,
    specificId,
    priority,
  ] = getValuesForTasks();
  let task = {
    specificId: specificId,
    dragAndDropId: '',
    title: title.value,
    category: category.value,
    description: description.value,
    dueDate: dueDate.value,
    createdDate: createdDate,
    assignedTo: assignedTo,
    priority: urgency,
    status: taskStatus,
  };
  allTasks.push(task);
  backend.setItem('tasks', allTasks);
  console.log(allTasks);
  animateToBoard();
  clearFields();
}

function clearFields() {
  getId('formAddTask').reset();
  // getId('taskTitle').value = '';
  // getId('taskDescription').value = '';
  // getId('taskCategory').value = 'New Category';
  // getId('taskDueDate').value = '';
  // getId('assignedToPeople').value = 'You';
}

function animateToBoard() {
  getId('messageToBoard').classList.remove('d-none');
  setTimeout(() => {
    document.body.classList.add('slide-in-left');
    window.location.href = 'board.html';
  }, 1000);
}

function getPriority(prio) {
  if (prio == 'urgent') {
    getId(prio).classList.add('urgentBtn');
    getId('medium').classList.remove('mediumBtn');
    getId('low').classList.remove('lowBtn');
    urgency = prio;
  } else if (prio == 'medium') {
    getId('urgent').classList.remove('urgentBtn');
    getId(prio).classList.add('mediumBtn');
    getId('low').classList.remove('lowBtn');
    urgency = prio;
  } else if (prio == 'low') {
    getId('urgent').classList.remove('urgentBtn');
    getId('medium').classList.remove('mediumBtn');
    getId(prio).classList.add('lowBtn');
  }
}
