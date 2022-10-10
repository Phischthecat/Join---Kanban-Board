let currentDraggedElement;
let idForClosing = [];

async function initTodos() {
  await init();
  setDragAndDropId();
  // allTasks = [];
  // backend.setItem('tasks', allTasks);
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
    idForClosing.push(task.specificId);
    document.getElementById(container).innerHTML += createTaskCard(task);
  }
}

function check(externalId) {
  let task = allTasks.find((id) => id['specificId'] == externalId);
  showFullView(task);
}

function showFullView(task) {
  let card = document.getElementById(task.specificId);
  card.innerHTML = '';
  if (card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  } else {
    card.innerHTML += createFullView(task);
    showUrgency(task);
    showContacts(task);
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
}

function showContacts(task) {
  let assignedContacts = document.getElementById('assignedUser');
  assignedContacts.innerHTML = '';
  for (let i = 0; i < task.assignedTo.length; i++) {
    assignedContacts.innerHTML += /*html*/`
    <div><span>${task.assignedTo[i].name}</span></div>
    `
  }
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

function closeFullView(taskId) {
  document.getElementById(taskId).classList.add('d-none');
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
