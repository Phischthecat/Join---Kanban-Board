let currentDraggedElement;
let sections = ['toDo', 'inProgress', 'awaitingFeedback', 'done'];

/**
 * initialising board section
 */
async function initTodos() {
  await init();
  setDragAndDropId();
  updateHTML();
}

/**
 * function for updating html
 */
function updateHTML() {
  updateContainer('toDo');
  updateContainer('inProgress');
  updateContainer('awaitingFeedback');
  updateContainer('done');
}

/**
 *
 * @param {id for dragging element} id
 */
function startDragging(id) {
  currentDraggedElement = id;
}

/**
 *
 * @param {changed the status of the element to draggable} ev
 */
function allowDrop(ev) {
  ev.preventDefault();
}

/**
 *
 * @param {the actual status of the current task} status
 */
async function moveTo(status) {
  allTasks[currentDraggedElement]['status'] = status;
  await backend.setItem('allTasks', allTasks);
  updateHTML();
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
 *
 * @param {for setting the task into the actual container} container
 */
function updateContainer(container) {
  if (allTasks.length > 0) {
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
}

/**
 *
 * @param {actual Task which should be updated} index
 */
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

/**
 *
 * @param {setting the urgency img} index
 */
function taskUrgency(index) {
  let task = allTasks[index];
  let urgency = getId('urgencyTask' + index);
  urgency.children[0].src = `./img/${task.priority}.addTask.svg`;
}

/**
 *
 * @param {*} index
 */
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

/**
 *
 * @param {*} task
 * @param {*} index
 */
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

/**
 *
 * @param {opens the clicked task in fullview} externalId
 */
function showFullView(externalId) {
  let task = allTasks.find((id) => id['specificId'] == externalId);
  let index = allTasks.indexOf(task);
  let card = document.getElementById('taskBox');
  responsiveBoard();
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

/**
 * adding z-index to the kanbanbar in responsive
 */
function responsiveBoard() {
  if (window.innerWidth < 800) {
    document.querySelector('.kanbanBar').style.zIndex = '50';
  }
}

/**
 *
 * @param {subtasks of the main task} subtasks
 * @param {actual index of the main task} index
 */
function renderSubtasksSection(subtasks, index) {
  if (!subtasks.length == 0) {
    createSubtasksContainer(index);
    createSubtasksSection('subtasksSection', subtasks);
  }
}

/**
 *
 * @param {creating a container on the actual index} index
 */
function createSubtasksContainer(index) {
  let subtasksFullCard = getId('subtasksFullCard' + index);
  subtasksFullCard.innerHTML = /*html*/ `
  <span><b>Subtasks:</b></span>
  <span id="subtasksSection"></span>
  `;
}

/**
 *
 * @param {actualtask which urgency has to be shown} task
 */
function showUrgency(task) {
  let actualPrio = document.getElementById('showUrgency');
  actualPrio.innerHTML = /*html*/ `
  <div class="fullviewUrgency" style="background-color: var(--${task.priority}Colour">
    <span>${task.priority}</span>
    <img src="./img/${task.priority}.addTask.svg">

  </div>
    `;
  styleUrgency(task);
}

/**
 *
 * @param {actualTask where a box will be rendered with the assigned Contacts} task
 */
function showContacts(task) {
  let assignedContacts = document.getElementById('assignedUser');
  assignedContacts.innerHTML = '';
  for (let i = 0; i < task.assignedTo.length; i++) {
    let taskContact = task.assignedTo[i];
    assignedContacts.innerHTML += createAssignedToFullCard(taskContact);
  }
}

/**
 *
 * @param {specific id of task} specific
 */
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

/**
 *
 * @param {task where the chossenContacts should be shown} task
 */
function choosenContacts(task) {
  let choosenContacts = document.querySelectorAll('.item');
  choosenContacts.forEach((choosenContact) => {
    if (task.assignedTo.find((a) => a.name == choosenContact.id)) {
      choosenContact.classList.add('checked');
    }
  });
  if (choosenContacts.length > 0) {
    getId('hiddenAssignedToInput').value = 's' + choosenContacts.length;
  }
}

/**
 *
 * @param {specific id of task which has to be changed} specific
 */
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

/**
 *
 * @param {task where the urgent has to be styled} task
 */
function styleUrgency(task) {
  let urgent = '#ff3b00',
    medium = '#ffb32a',
    low = '#7be129';

  getId('showUrgency').style = `background-color: ${task.priority}`;
}

/**
 * function for closing fullview
 */
async function closeFullView() {
  await backend.setItem('allTasks', allTasks);
  document.getElementById('taskBox').classList.add('d-none');
  document.querySelector('.kanbanBar').style.zIndex = '1';
  updateHTML();
}

/**
 *
 * checking if a subtask is created
 * @param {number} index index of the respectively task
 */
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

/**
 * showing where a task can be dropped
 */
function showPossibleDropzones() {
  let columns = document.querySelectorAll('.column');
  columns.forEach((column) => {
    column.innerHTML += /*html*/ `
    <div class="possiblePosition"></div>
    `;
  });
}

/**
 * removing the possible dropzones that are shown when a task is dragged
 */
function removePossibleDropzones() {
  let dropzones = document.querySelectorAll('.possiblePosition');
  dropzones.forEach((dropzone) => {
    dropzone.remove();
  });
}

/**
 *
 * @param {task which has to be deleted} taskIndex
 */
async function deleteTask(taskIndex) {
  allTasks.splice(taskIndex, 1);
  await backend.setItem('allTasks', allTasks);
  closeFullView();
}

/**
 * function for searching  Task
 */
function searchForTask() {
  let searchedTasks;
  let search = getId('search').value.toLowerCase();
  if (search.length == 0) {
    updateHTML();
  } else {
    sections.forEach((section) => {
      getId(section).innerHTML = '';
    });
    for (let i = 0; i < allTasks.length; i++) {
      const task = allTasks[i];
      if (task.title.toLowerCase().includes(search)) {
        searchedTasks = task;
        updateOnSearch(searchedTasks, i);
      }
    }
  }
}

/**
 *
 * @param {array of founded task by their input value} searchedTasks
 * @param {index of array} index
 */
function updateOnSearch(searchedTasks, index) {
  let column = getId(searchedTasks.status);
  column.innerHTML += createTaskCard(index);
  renderBoardInitials(searchedTasks, index);
  taskUrgency(index);
  updateProgressbar(index);
}
