let currentDraggedElement;

async function initTodos() {
  await init();
  // muss noch abgeändert werden und separat geladen werden
  setDragAndDropId();
  // allTasks = [];
  // await backend.setItem('allTasks', allTasks);
  // categorys = [];
  // await backend.setItem('categorys', categorys);
  // contacts = [];
  // await backend.setItem('contacts', contacts);
  updateHTML();
}

function updateHTML() {
  updateContainer('toDo');
  updateContainer('inProgress');
  updateContainer('awaitingFeedback');
  updateContainer('done');
}

function startDragging(id) {
  // Weist die jeweilige Id, dem zu verschiebenen Element zu.
  currentDraggedElement = id;
}

function allowDrop(ev) {
  // Verändert das Standarverhalten des Elements. Es wird z.B. Draggable.
  ev.preventDefault();
}

async function moveTo(status) {
  // Sorgt dafür, dass das Element Draggable wird, indem die entsprechende category zugewiesen wird.
  allTasks[currentDraggedElement]['status'] = status;
  backend.setItem('tasks', allTasks);
  updateHTML();
}

function setDragAndDropId() {
  for (let i = 0; i < allTasks.length; i++) {
    allTasks[i]['dragAndDropId'] = i;
  }
}

function updateContainer(container) {
  let filteredTask = allTasks.filter((t) => t['status'] == container);
  let column = getId(container);
  column.innerHTML = '';
  for (let i = 0; i < filteredTask.length; i++) {
    let task = filteredTask[i];
    let index = allTasks.indexOf(task);
    column.innerHTML += createTaskCard(index);
    renderBoardInitials(task, index);
    taskUrgency(index);
    updateProgressbar(index);
  }
}

function updateProgressbar(index) {
  let subtasks = allTasks[index].subtasks,
    subtasksLength = subtasks.length,
    doneSubtasks = subtasks.filter((n) => n.checked == true),
    progressbar = getId('progresslabel' + index),
    progressLabel = getId('barText' + index),
    progessValue = 100 * (doneSubtasks.length / subtasksLength),
    progressContainer = getId('proContainer' + index);
  if (subtasksLength > 0) {
    progressContainer.classList.remove('d-none');
    progressLabel.innerHTML = doneSubtasks.length + '/' + subtasksLength;
    progressbar.value = progessValue;
  } else {
    progressContainer.classList.add('d-none');
  }
}

function taskUrgency(index) {
  let task = allTasks[index];
  let urgency = getId('urgencyTask' + index);
  urgency.children[0].src = `img/${task.priority}.addTask.svg`;
}

function boardInitialsClassAdd(index) {
  let initials = getId('assignedUsers' + index);
  classList = 'classList' in initials;
  for (let i = 0; i < initials.children.length; i++) {
    const child = initials.children[i];
    if (child.tagName == 'DIV' && classList) {
      child.classList.add('boardInitial');
    }
  }
}

function renderBoardInitials(task, index) {
  renderAssignedContactInitials(task.assignedTo, 'assignedUsers' + index);
  renderMoreBoardInitials(task, index);
}

function renderMoreBoardInitials(task, index) {
  let overflow = task.assignedTo.length - 2;
  if (overflow >= 1) {
    let firstTwo = [task.assignedTo[0], task.assignedTo[1]];
    renderAssignedContactInitials(firstTwo, 'assignedUsers' + index);
    getId('assignedUsers' + index).innerHTML +=
      createAssignedContactInitialsOverflow(overflow);
    boardInitialsClassAdd(index);
  } else {
    renderAssignedContactInitials(task.assignedTo, 'assignedUsers' + index);
    boardInitialsClassAdd(index);
  }
}

function showFullView(externalId) {
  let task = allTasks.find((id) => id['specificId'] == externalId);
  let index = allTasks.indexOf(task);
  let card = document.getElementById('taskBox');
  card.innerHTML = '';
  card.classList.remove('d-none');
  card.innerHTML += createFullView(task, index);
  showUrgency(task);
  showContacts(task);
  if (task.subtasks.length > 0) {
    renderSubtasksSection(task.subtasks, index);
    createSubtasksSection('subtasksSection', task.subtasks);
  }
}

function renderSubtasksSection(subtasks, index) {
  if (!subtasks.length == 0) {
    createSubtasksContainer(index);
    createSubtasksSection('subtasksSection', subtasks);
  }
}

function createSubtasksContainer(index) {
  let subtasksFullCard = getId('subtasksFullCard' + index);
  subtasksFullCard.innerHTML = /*html*/ `
  <span><b>Subtasks:</b></span>
  <span id="subtasksSection"></span>
  `;
}

function showUrgency(task) {
  let actualPrio = document.getElementById('showUrgency');
  actualPrio.innerHTML = /*html*/ `
  <div class="fullviewUrgency" style="background-color: var(--${task.priority}Colour">
    <span>${task.priority}</span>
    <img src="/img/${task.priority}.addTask.svg">

  </div>
    `;
  styleUrgency(task);
}

function showContacts(task) {
  let assignedContacts = document.getElementById('assignedUser');
  assignedContacts.innerHTML = '';
  for (let i = 0; i < task.assignedTo.length; i++) {
    let taskContact = task.assignedTo[i];
    assignedContacts.innerHTML += createAssignedToFullCard(taskContact);
  }
}

function renderEditTask(specific) {
  let task = allTasks.find((id) => id['specificId'] == specific);
  let card = document.getElementById('fullCard');
  card.innerHTML = '';
  setTimeout(() => {
    card.innerHTML += createEditTask(task);
    renderAssignedToContacts();
    renderAssignedContactInitials(task.assignedTo, 'assignedToContacts');
    choosenContacts(task);
    getPriority(task.priority);
  }, 200);
}

function choosenContacts(task) {
  let choosenContacts = document.querySelectorAll('.item');
  choosenContacts.forEach((choosenContact) => {
    if (task.assignedTo.find((a) => a.name == choosenContact.id)) {
      choosenContact.classList.add('checked');
    }
  });
}

async function changeTask(specific) {
  let task = allTasks.find((id) => id['specificId'] == specific);
  task.title = getId('editTitle').value.trim();
  task.description = getId('editDescription').value.trim();
  task.dueDate = getId('changedDate').value;
  task.priority = urgency;
  task.assignedTo = filterAssignedContacts();
  await backend.setItem('allTasks', allTasks);
  showFullView(task.specificId);
  document.querySelector('.modalContainer').classList.remove('fade');
}

function styleUrgency(task) {
  let urgent = '#ff3b00',
    medium = '#ffb32a',
    low = '#7be129';

  getId('showUrgency').style = `background-color: ${task.priority}`;

  // if (task.priority == 'urgent') {
  //   document.getElementById(
  //     'showUrgency'
  //   ).style = `background-color: #ff3b00`;
  // } else if (task.priority == 'medium') {
  //   document.getElementById(
  //     'showUrgency'
  //   ).style = `background-color: #ffb32a`;
  // } else if (task.priority == 'low') {
  //   document.getElementById('showUrgency').style = `background-color: #7be129`;
  // }
}

async function closeFullView(index) {
  checkIfSubtasksDone(index);
  await backend.setItem('allTasks', allTasks);
  document.getElementById('taskBox').classList.add('d-none');
  updateHTML();
}

function checkIfSubtasksDone(index) {
  let task = allTasks[index];
  let checkboxes = document.querySelectorAll('input[type=checkbox]');
  for (let i = 0; i < checkboxes.length; i++) {
    const checkbox = checkboxes[i];
    if (checkbox.checked) {
      task.subtasks[i].checked = true;
    } else {
      task.subtasks[i].checked = false;
    }
  }
}

function showPossibleDropzones() {
  let columns = document.querySelectorAll('.column');
  columns.forEach((column) => {
    column.innerHTML += /*html*/ `
    <div class="possiblePosition"></div>
    `;
  });
}

function removePossibleDropzones() {
  let dropzones = document.querySelectorAll('.possiblePosition');
  dropzones.forEach((dropzone) => {
    dropzone.remove();
  });
}
