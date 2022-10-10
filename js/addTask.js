let allTasks = [];
let urgency;

async function initAddTask() {
  await init();
  setDueDateOnToday();
  renderCategorys();
  renderAssignedToContacts();
}

/**
 * This function is used to return the ids and/or values of the input fields for the current task
 */
function getValuesForTasks() {
  let assignedToContacts = [];
  let checkedContacts = document.querySelectorAll('.checked');
  for (let i = 0; i < checkedContacts.length; i++) {
    let contact = contacts.find((n) => n.name == checkedContacts[i].id);
    assignedToContacts.push(contact);
  }
  let title = getId('taskTitle');
  let description = getId('taskDescription');
  let dueDate = getId('taskDueDate');
  let createdDate = new Date().getTime(); //only text-format could be safed in storage --> change object to getTime (UnixTimestamp since 01.01.1970)
  let specificId = new Date().getTime();
  let assignedTo = assignedToContacts;
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
    status: taskStatus,
  };
  allTasks.push(task);
  await backend.setItem('allTasks', allTasks);
  console.log(allTasks);
  animateToBoard();
  clearFields();
}

function clearFields() {
  getId('formAddTask').reset();
  setDueDateOnToday();
}

function animateToBoard() {
  getId('messageToBoard').classList.remove('d-none');
  setTimeout(() => {
    document.body.classList.add('slide-in-left');
    window.location.href = 'board.html';
  }, 1200);
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
