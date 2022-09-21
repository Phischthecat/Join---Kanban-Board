let currentDraggedElement;
let idForClosing = [];

async function initTodos() {
  await init();
  setDragAndDropId();
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

function highlight(category) {
  document.getElementById(category).classList.add('highlight');
}

function removeHighlight(category) {
  document.getElementById(category).classList.remove('highlight');
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
  //   for (let y = 0; y < allTasks.length; y++) {
  //     const element = allTasks[y];
  document.getElementById(taskId).classList.add('d-none');
  //   }
}

async function openTaskBox() {
  setTimeout(() => {
    w3IncludeHTML();
  }, 100);
  let box = document.getElementById('taskBox');
  box.innerHTML = '';
  box.innerHTML += createTaskBox;
  setTimeout(() => {
    showBtn(box);
  }, 200);
}

function closeTaskBox() {
  document.getElementById('animation').classList.toggle('slide-out-right');
  setTimeout(() => {
    document.getElementById('taskBox').classList.toggle('d-none');
  }, 1000);
}

function showPossibleDropzones(dropId) {
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
