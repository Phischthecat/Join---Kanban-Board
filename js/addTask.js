let allTasks = [];
let urgency;

/**
 * main function for add task section
 */
async function initAddTask() {
  await init();
  setDueDateOnToday();
  renderCategorys();
  renderAssignedToContacts();
}

/**
 *
 * @returns an array with assigned contacts
 */
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
 * setting the drag and drop id
 */
async function setDragAndDropId() {
  for (let i = 0; i < allTasks.length; i++) {
    allTasks[i]['dragAndDropId'] = i;
  }
  await backend.setItem('allTasks', allTasks);
}


/**
 * This function is used to create the Task and add it to the storage
 *  * @param {string} taskStatus -- after creating a task the user is asked to push the task into backlog or toDo
 */
async function addTask(taskStatus) {
  let task = taskStrucure(taskStatus);
  allTasks.push(task);
  await backend.setItem('allTasks', allTasks);
  userFeedback();
  clearFields();
}

/**
 *
 * @returns the structure of a task
 */
function taskStrucure(taskStatus) {
  [title, description, dueDate, createdDate, assignedTo, specificId, priority] =
    getValuesForTasks();
  return {
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
}

/**
 * function for resetting all inputfields
 */
function clearFields() {
  setDueDateOnToday();
  getId('formAddTask').reset();
  renderCategorySelection();
  renderCategorys();
  getId('assignedToBtnText').innerText = 'Select contacts to assign';
  renderAssignedToContacts();
  getId('assignedToContacts').innerHTML = '';
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
