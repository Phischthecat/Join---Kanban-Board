let currentDraggedElement;

async function initTodos() {
  await init();
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
  document.getElementById(container).innerHTML = '';
  for (let i = 0; i < filteredTask.length; i++) {
    let task = filteredTask[i];
    document.getElementById(container).innerHTML += createTaskCard(task);
  }
}

function showFullView(externalId) {
  let task = allTasks.find((id) => id['specificId'] == externalId);
  let card = document.getElementById('taskBox');
  card.innerHTML = '';
  if (card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  } else {
    card.innerHTML += createFullView(task);
    showUrgency(task);
  }
}

function showUrgency(task) {
  let actualPrio = document.getElementById('showUrgency');
  actualPrio.innerHTML = '';
  actualPrio.innerHTML += /*html*/ `
        <span>${task.priority}</span>
        <img src="/img/${task.priority}.addTask.svg">
    `;
  styleUrgency(task);
  showContacts(task);
}

function showContacts(task) {
  let assignedContacts = document.getElementById('assignedUser');
  assignedContacts.innerHTML = '';
  for (let i = 0; i < task.assignedTo.length; i++) {
    let taskContact = task.assignedTo[i];
    assignedContacts.innerHTML += createAssignedToFullCard(taskContact);
  }
}

function changeOption(specific) {
  let task = allTasks.find((id) => id['specificId'] == specific);
  let card = document.getElementById('fullCard');
  card.innerHTML = '';
  setTimeout(() => {
    card.innerHTML += createChangeOption(task);
    renderAssignedToContacts();
    renderAssignedContactInitials(task.assignedTo);
    getPriority(task.priority);
    let choosenContacts = document.querySelectorAll('.item');
    choosenContacts.forEach((choosenContact) => {
      if (task.assignedTo.find((a) => a.name == choosenContact.id)) {
        choosenContact.classList.add('checked');
      }
    });
    renderAssignedContactInitials(task.assignedTo);
  }, 200);
}

async function changeTask(specific) {
  let task = allTasks.find((id) => id['specificId'] == specific);
  task.title = getId('editTitle').value;
  task.description = getId('editDescription').value;
  task.dueDate = getId('changedDate').value;
  task.priority = urgency;
  task.assignedTo = filterAssignedContacts();
  await backend.setItem('allTasks', allTasks);
  showFullView(task.specificId);
}

function styleUrgency(task) {
  let urgent = '#ff3b00';
  let medium = '#ffb32a';
  let low = '#7be129';

  if (task.priority == 'urgent') {
    document.getElementById(
      'showUrgency'
    ).style = `background-color: ${urgent}`;
  } else if (task.priority == 'medium') {
    document.getElementById(
      'showUrgency'
    ).style = `background-color: ${medium}`;
  } else if (task.priority == 'low') {
    document.getElementById('showUrgency').style = `background-color: ${low}`;
  }
}

function closeFullView() {
  setTimeout(() => {
    document.getElementById('taskBox').classList.add('d-none');
  }, 200);
  initTodos();
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
