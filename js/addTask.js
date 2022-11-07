let allTasks = [];
let urgency;

async function initAddTask() {
  await init();
  setDueDateOnToday();
  renderCategorys();
  renderAssignedToContacts();
}

function filterAssignedContacts() {
  let assignedToContacts = [];
  let checkedContacts = document.querySelectorAll('.checked');
  for (let i = 0; i < checkedContacts.length; i++) {
    let contact = contacts.find((n) => n.name == checkedContacts[i].id);
    assignedToContacts.push(contact);
  }
  return assignedToContacts;
}

/**
 * This function is used to return the ids and/or values of the input fields for the current task
 */
function getValuesForTasks() {
  let title = getId('taskTitle');
  let description = getId('taskDescription');
  let dueDate = getId('taskDueDate');
  let createdDate = new Date().getTime(); //only text-format could be safed in storage --> change object to getTime (UnixTimestamp since 01.01.1970)
  let specificId = new Date().getTime();
  let assignedTo = filterAssignedContacts();
  let priority = '';
  return [
    title,
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
async function addTask(taskStatus) {
  [title, description, dueDate, createdDate, assignedTo, specificId, priority] =
    getValuesForTasks();
  let task = {
    specificId: specificId,
    dragAndDropId: '',
    title: title.value,
    category: categorys[categoryIndex],
    description: description.value,
    dueDate: dueDate.value,
    createdDate: createdDate,
    assignedTo: assignedTo,
    priority: urgency,
    subtasks: addTaskSubtasks,
    status: taskStatus,
  };
  allTasks.push(task);
  await backend.setItem('allTasks', allTasks);
  console.log(allTasks);
  userFeedback();
  // animateToBoard();
  clearFields();
}


/**
 * function for resetting all inputfields
 */
function clearFields() {
  setDueDateOnToday();
  getId('formAddTask').reset();
  renderCategorySelection();
  getId('assignedToBtnText').innerText = 'Select contacts to assign';
  renderAssignedToContacts();
  getId('subtasksContainer').innerHTML = '';
  getId('urgent').classList.remove('urgentBtn');
  getId('medium').classList.remove('mediumBtn');
  getId('low').classList.remove('lowBtn');
}

/**
 * shows a message with user feedback when a task is successfully created
 */
function userFeedback() {
  getId('messageToBoard').classList.remove('d-none');
  setTimeout(() => {
    getId('messageToBoard').classList.add('d-none');
  }, 2000);
}


/**
 * setting the animation for going to board
 */
function animateToBoard() {
  setTimeout(() => {
    document.body.classList.add('slide-in-left');
    window.location.href = 'board.html';
  }, 1200);
}


/**
 * 
 * @param {the priority of the actual task} prio 
 */
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
