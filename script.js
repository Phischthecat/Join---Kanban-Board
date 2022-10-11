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
  document.body.style.overflow = 'hidden';
  let box = document.getElementById('taskBox');
  box.innerHTML = addTaskContainerHMTL();
  renderCategorys();
  renderAssignedToContacts();
  setTimeout(() => {
    getId('animation').classList.toggle('slide-in-right');
    getId('animation').classList.toggle('fade-in');
    getId('animation').classList.toggle('background');
    if (box.classList.contains('d-none')) {
      box.classList.remove('d-none');
    }
  }, 150);
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
  } else {
    btnText.innerText = 'Select contacts to assign';
  }
  renderAssignedContactInitials(checkedContacts);
}

function renderAssignedContactInitials(checkedContacts) {
  let assignedContacts = getId('assignedToContacts');
  assignedContacts.innerHTML = '';
  for (let i = 0; i < checkedContacts.length; i++) {
    if ((contact = contacts.find((n) => n.name == checkedContacts[i].id))) {
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
    urgency = prio;
  }
}
