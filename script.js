let categoryColors = [
  '#0038ff',
  '#e200be',
  '#ff8a00',
  '#2ad300',
  '#ff0000',
  '#8aa4ff',
];

// let categorys = [
//   {
//     name: 'Sales',
//     color: '#fc71ff',
//   },
//   {
//     name: 'Backoffice',
//     color: '#1fd7c1',
//   },
// ];
let choosenColor;
let categoryIndex;
let checkedContactsList = [];
let addTaskSubtasks = [];

async function init() {
  await downloadFromServer();
  allTasks = (await backend.getItem('allTasks')) || [];
  users = (await backend.getItem('users')) || [];
  contacts = (await backend.getItem('contacts')) || [];
  categorys = (await backend.getItem('categorys')) || [];
  // users = [];
  // backend.setItem('users', users)
  includeHTML();
  checkIfUserIsLoggedIn();
  // checkForResizingScreen();
}


function checkForResizingScreen() {
  window.addEventListener('resize', () => {
    if (window.innerWidth < 800) {
      getId('imgResponsive').classList.remove('d-none');
    } else {
      getId('imgResponsive').classList.add('d-none');
    }
  })
}


async function includeHTML() {
  let includeElements = document.querySelectorAll('[w3-include-html]'); //////// Greift bzw. fragt nach allen Elemente mit "w3-include-html".  ////////
  for (let i = 0; i < includeElements.length; i++) {
    //////// Standard for-schleife ////////
    const element = includeElements[i];
    file = element.getAttribute('w3-include-html'); //////// templatesHTML/header.html ////////
    let response = await fetch(file);
    if (response.ok) {
      element.innerHTML = await response.text(); //////// Abfrage ob Datei gefunden wurde oder nicht. ////////
    } else {
      element.innerHTML = 'Page not found';
    }
  }
}

function setDueDateOnToday() {
  let date = document.getElementById('taskDueDate');
  today = new Date();
  date.value =
    today.getFullYear() +
    '-' +
    (today.getMonth() + 1).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }) +
    '-' +
    today.getDate().toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
}

async function openTaskBox(pickedContainer) {
  setResponsiveStyle();
  let box = document.getElementById('taskBox');
  box.innerHTML = addTaskContainerHMTL();
  renderCategorys();
  renderAssignedToContacts();
  slideAnimation(box);
}


function setResponsiveStyle() {
  if (window.innerWidth > 800) {
    document.body.style.overflow = 'hidden';
    getId('navbar').classList.remove('d-none');
  } else {
    getId('navbar').classList.add('d-none');
    document.body.style.overflow = 'scroll';
  }
}


function slideAnimation(box) {
  setTimeout(() => {
    getId('animation').classList.toggle('slide-in-right');
    getId('animation').classList.toggle('fade-in');
    getId('animation').classList.toggle('background');
    if (box.classList.contains('d-none')) {
      box.classList.remove('d-none');
    }
    setResponsiveDesign();
  }, 200);
}


function setResponsiveDesign() {
  if (window.innerWidth > 800) {
    getId('buttonContainer').classList.remove('d-none');
    getId('kanbanTextBoard').style = 'display: flex !important';
  } else {
    getId('actualUser').innerHTML = '';
    getId('kanbanTextBoard').style = 'display: none !important';
    getId('buttonContainer').classList.add('d-none');
  }
}


function closeTaskBox() {
  let taskBoxContainer = document.getElementById('animation');
  let taskBox = document.getElementById('taskBox');
  taskBoxContainer.classList.toggle('slide-in-right');
  taskBoxContainer.classList.toggle('slide-out-right');
  taskBoxContainer.classList.toggle('background');
  setTimeout(() => {
    taskBox.classList.toggle('d-none');
    document.body.style.overflow = 'auto';
  }, 1000);
}

async function openContactBox(fct, contact) {
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    w3IncludeHTML();
  }, 100);
  let box = getId('taskBox');
  box.innerHTML = fct(contact);
  setTimeout(() => {
    getId('animation').classList.toggle('slide-in-right');
    getId('animation').classList.toggle('fade-in');
  }, 300);
  if (box.classList.contains('d-none')) {
    box.classList.remove('d-none');
  }
}

function closeContactBox() {
  document.getElementById('animation').classList.toggle('slide-out-right');
  setTimeout(() => {
    document.getElementById('taskBox').classList.toggle('d-none');
  }, 1000);
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
 * This function is for checking if the User is logged In or not so that he can´t evade the Login Section
 */
function checkIfUserIsLoggedIn() {
  if (!window.location.href.endsWith('index.html')) {
    if (
      localStorage.getItem('loggedInKey') === null &&
      !window.location.href.endsWith('register.html')
    ) {
      window.location.href = './index.html';
    }
  }
}

function gotToBoard() {
  window.location.href = 'board.html';
}

/**
 * This Function is a simplified spelling for document.getElementById
 * @param {string} theId is used for the actual Id
 * @returns document.getElementById();
 */
function getId(theId) {
  return document.getElementById(theId);
}

async function renderAssignedToContacts() {
  let contactSelection = getId('assignedToList');
  contactSelection.innerHTML = '';
  for (let i = 0; i < contacts.length; i++) {
    contactSelection.innerHTML += contactsAssignedTo(i);
  }
}

function openDropdownMenu(id) {
  getId('selectBtn' + id).classList.toggle('open');
  getId('assignedToContacts').classList.toggle('d-none');
}

function checked(name) {
  getId(name).classList.toggle('checked');
  let checkedContacts = document.querySelectorAll('.checked'),
    btnText = getId('assignedToBtnText');
  if (checkedContacts && checkedContacts.length > 0) {
    btnText.innerText = `${checkedContacts.length} Selected`;
    getId('hiddenAssignedToInput').value = 's' + checkedContacts.length;
  } else {
    btnText.innerText = 'Select contacts to assign';
  }
  renderAssignedContactInitials(checkedContacts, 'assignedToContacts');
}

function renderAssignedContactInitials(checkedContacts, id) {
  let assignedContacts = getId(id);
  assignedContacts.innerHTML = '';
  for (let i = 0; i < checkedContacts.length; i++) {
    if (
      (contact = contacts.find(
        (n) => n.name == [checkedContacts[i].id || checkedContacts[i].name]
      ))
    ) {
      assignedContacts.innerHTML += createAssignedContactInitials(contact);
    }
  }
}

function createAssignedContactInitials(contact) {
  return /*html*/ `
    <div class="initials initialCircle" style="background-color:#${contact.color}">${contact.initial}</div>
    `;
}

function renderCategorys() {
  let categoryList = getId('categoryList');
  categoryList.innerHTML = createCategoryDefault();
  for (let i = 0; i < categorys.length; i++) {
    categoryList.innerHTML += createCategorys(i);
  }
}

function renderChoosenCategory(i) {
  categoryIndex = i;
  const category = categorys[i];
  choosenColor = category.color;
  renderSelectedCategory(category.name);
  renderCategorys();
}

function addNewCategory() {
  let newCategory = getId('categorySelect');
  newCategory.innerHTML = createInputForNewCategory();
  renderNewCategoryColors();
}

function cancelNewCategory() {
  renderCategorySelection();
  renderCategorys();
}

function renderNewCategoryColors() {
  let colorContainer = getId('categoryColorContainer');
  colorContainer.innerHTML = '';
  for (let i = 0; i < categoryColors.length; i++) {
    colorContainer.innerHTML += createNewCategoryColors(i);
  }
}

function categoryColorChoose(colorId) {
  let colorBubbles = document.querySelectorAll('.colorBubble');
  colorBubbles.forEach((colorBubble) => {
    colorBubble.classList.remove('checked');
  });
  getId('color' + colorId).classList.add('checked');
  choosenColor = categoryColors[colorId];
}

function renderCategorySelection() {
  let categorySelection = getId('categorySelect');
  categorySelection.innerHTML = createCategorySelection();
}

function renderSelectedCategory(input, index) {
  let categorySelection = getId('categorySelect');
  categorySelection.innerHTML = createSelectedCategory(input, index);
}

async function saveNewCategory() {
  let input = document.querySelector('.newCategoryInput').value;
  categorys.push({
    name: input,
    color: choosenColor,
  });
  categoryIndex = categorys.findIndex((n) => n.name == input);
  await backend.setItem('categorys', categorys);
  renderSelectedCategory(input);
  renderCategorys();
}

function getPriority(prio) {
  if (prio == 'urgent') {
    getId(prio).classList.add('urgentBtn');
    getId('medium').classList.remove('mediumBtn');
    getId('low').classList.remove('lowBtn');
  } else if (prio == 'medium') {
    getId('urgent').classList.remove('urgentBtn');
    getId(prio).classList.add('mediumBtn');
    getId('low').classList.remove('lowBtn');
  } else if (prio == 'low') {
    getId('urgent').classList.remove('urgentBtn');
    getId('medium').classList.remove('mediumBtn');
    getId(prio).classList.add('lowBtn');
  }
  urgency = prio;
  getId('hiddenUrgentInput').value = prio;
}

function renderSubtaskSection() {
  let subtasksIcons = getId('substasksIcons');
  document.querySelector('.newSubtasksInput').value = '';
  subtasksIcons.innerHTML = /*html*/ `
  <div class="subtasksPlus" title="Add new subtasks" onclick="changeSubTasksIcons()">
    <i class="fa-regular fa-plus"></i>
  </div>
  `;
}

function cancelNewSubtasks() {
  renderSubtaskSection();
  addTaskSubtasks = [];
}

function saveNewSubtasks() {
  let input = document.querySelector('.newSubtasksInput').value.trim();
  if (!addTaskSubtasks.find((n) => n.description == input) && input) {
    addTaskSubtasks.push({
      description: input,
      checked: false,
    });
    createSubtasksSection('subtasksContainer', addTaskSubtasks);
  }
  renderSubtaskSection();
}

function createSubtasksSection(id, arr) {
  let subtasksContainer = getId(id);
  subtasksContainer.innerHTML = '';
  for (let i = 0; i < arr.length; i++) {
    const subtask = arr[i];
    if (subtask.checked == true) {
      subtasksContainer.innerHTML += /*html*/ `
    <div class="subtask">
      <input type="checkbox" id="sub${i}" checked>${subtask.description}
    </div>
    `;
    } else {
      subtasksContainer.innerHTML += /*html*/ `
      <div class="subtask">
        <input type="checkbox" id="sub${i}">${subtask.description}
      </div>
      `;
    }
  }
}

function changeSubTasksIcons() {
  let subtasksIcons = getId('substasksIcons');
  subtasksIcons.innerHTML = /*html*/ `
  <span
    class="cancel-btn"
    onclick="cancelNewSubtasks()"
    title="Cancel"
  >
    <i class="fa-solid fa-xmark"></i>
  </span>
  <span
    class="check-btn"
    onclick="saveNewSubtasks()"
    title="Save new subtasks"
    >
    <i class="fa-solid fa-check"></i>
  </span>
  `;
}

/**
 * this function is used for the toggling the slide animation
 */
function opportunityLogout() {
  getId('logoutBox').classList.toggle('d-none');
  getId('logoutBox').classList.toggle('slide-in-right');
}

/**
 * function that is used for logout
 */
async function logout() {
  let loggedOut = users.find((n) => n.logStatus == 'loggedIn');
  if (users.length > 0 && loggedOut) {
    loggedOut.logStatus = '';
    users = await backend.setItem('users', users);
    setTimeout(() => {
      localStorage.removeItem('loggedInKey');
      window.location.href = './index.html';
    }, 200);
  } else {
    window.location.href = './index.html';
    localStorage.removeItem('loggedInKey');
  }
}

/**
 * function for showing the help section
 */
function showHelpSection() {
  getId('help').classList.remove('d-none');
  getId('questionMark').classList.add('d-none');
  getId('help').innerHTML = '';
  getId('help').innerHTML += createHelpSection();
}

/**
 * close Help Section
 */
function closeHelpSection() {
  getId('help').classList.add('d-none');
  getId('questionMark').classList.remove('d-none');
}
