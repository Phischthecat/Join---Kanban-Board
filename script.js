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

/**
 * loading all data from backend
 */
async function init() {
  await downloadFromServer();
  allTasks = (await backend.getItem('allTasks')) || [];
  users = (await backend.getItem('users')) || [];
  contacts = (await backend.getItem('contacts')) || [];
  categorys = (await backend.getItem('categorys')) || [];
  includeHTML();
  checkIfUserIsLoggedIn();
}

/**
 * w3 include function to use html snippets
 */
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

/**
 * function for setting duedate on todays date
 */
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

/**
 * opening Taskbox
 */
function openTaskBox() {
  let box = document.getElementById('taskBox');
  box.innerHTML = addTaskContainerHMTL();
  setDueDateOnToday();
  renderCategorys();
  renderAssignedToContacts();
  slideAnimation(box);
}

/**
 *
 * function for creating a slide animation
 * @param {actualConatiner} box
 */
function slideAnimation(box) {
  setTimeout(() => {
    getId('animation').classList.toggle('slide-in-right');
    getId('animation').classList.toggle('fade-in');
    getId('animation').classList.toggle('background');
    box.classList.remove('d-none');
  }, 200);
}

/**
 * function for closing a taskbox
 */
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

/**
 *
 * opening a contactBox
 * @param {function} fct
 * @param {used Contact} contact
 */
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

/**
 * closing a contact Box
 */
function closeContactBox() {
  document.getElementById('animation').classList.toggle('slide-out-right');
  setTimeout(() => {
    document.getElementById('taskBox').classList.toggle('d-none');
  }, 1000);
}

/**
 *
 * @returns all users that are selected in the assigned to section
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

/**
 * function to forward only to board
 */
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

/**
 * rendering assigned contacts in a template
 */
async function renderAssignedToContacts() {
  let contactSelection = getId('assignedToList');
  contactSelection.innerHTML = '';
  for (let i = 0; i < contacts.length; i++) {
    contactSelection.innerHTML += contactsAssignedTo(i);
  }
}

/**
 *
 * opening dropdown menu to assign contacts
 * @param {id of task} id
 */
function openDropdownMenu(id) {
  getId('selectBtn' + id).classList.toggle('open');
  getId('assignedToContacts').classList.toggle('d-none');
}

/**
 *
 * showing selectbox checked or not checked and html 5 formvalidation
 * @param {name of contacts} name
 */
function checked(name) {
  getId(name).classList.toggle('checked');
  let checkedContacts = document.querySelectorAll('.checked'),
    btnText = getId('assignedToBtnText');
  if (checkedContacts && checkedContacts.length > 0) {
    btnText.innerText = `${checkedContacts.length} Selected`;
    getId('hiddenAssignedToInput').value = 's' + checkedContacts.length;
  } else {
    btnText.innerText = 'Select contacts to assign';
    getId('hiddenAssignedToInput').value = '';
  }
  renderAssignedContactInitials(checkedContacts, 'assignedToContacts');
}

/**
 *
 * rendering all selected contacts in a container
 * @param {all contacts that are selected} checkedContacts
 * @param {id of actual contact} id
 */
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

/**
 *
 * @param {contact for the initials} contact
 * @returns styling the circle with the initials
 */
function createAssignedContactInitials(contact) {
  return /*html*/ `
    <div class="initials initialCircle" style="background-color:#${contact.color}">${contact.initial}</div>
    `;
}

/**
 * rendering all categorys in a container
 */
function renderCategorys() {
  let categoryList = getId('categoryList');
  categoryList.innerHTML = createCategoryDefault();
  for (let i = 0; i < categorys.length; i++) {
    categoryList.innerHTML += createCategorys(i);
  }
}

/**
 *
 * rendering all selected categorys
 * @param {index} i
 */
function renderChoosenCategory(i) {
  categoryIndex = i;
  const category = categorys[i];
  choosenColor = category.color;
  renderSelectedCategory(category.name);
  renderCategorys();
}

/**
 * function for adding a new category in a template
 */
function addNewCategory() {
  let newCategory = getId('categorySelect');
  newCategory.innerHTML = createInputForNewCategory();
  renderNewCategoryColors();
}

/**
 * cancelling creating new category
 */
function cancelNewCategory() {
  renderCategorySelection();
  renderCategorys();
}

/**
 * function or rendering colors of categorys
 */
function renderNewCategoryColors() {
  let colorContainer = getId('categoryColorContainer');
  colorContainer.innerHTML = '';
  for (let i = 0; i < categoryColors.length; i++) {
    colorContainer.innerHTML += createNewCategoryColors(i);
  }
}

/**
 *
 * setting the color that is used
 * @param {id of color } colorId
 */
function categoryColorChoose(colorId) {
  let colorBubbles = document.querySelectorAll('.colorBubble');
  colorBubbles.forEach((colorBubble) => {
    colorBubble.classList.remove('checked');
  });
  getId('color' + colorId).classList.add('checked');
  choosenColor = categoryColors[colorId];
}

/**
 * rendering the category section in atemplate
 */
function renderCategorySelection() {
  let categorySelection = getId('categorySelect');
  categorySelection.innerHTML = createCategorySelection();
}

/**
 *
 * rendering all selected categorys
 * @param {value} input
 * @param {index} index
 */
function renderSelectedCategory(input, index) {
  let categorySelection = getId('categorySelect');
  categorySelection.innerHTML = createSelectedCategory(input, index);
}

/**
 * saving a created category in backend
 */
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

/**
 *
 * setting urgency backgroundcolor
 * @param {priority that is selected} prio
 */
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

/**
 * rendering subtask section in a template
 */
function renderSubtaskSection() {
  let subtasksIcons = getId('substasksIcons');
  document.querySelector('.newSubtasksInput').value = '';
  subtasksIcons.innerHTML = /*html*/ `
  <div class="subtasksPlus" title="Add new subtasks" onclick="changeSubTasksIcons()">
    <i class="fa-regular fa-plus"></i>
  </div>
  `;
}

/**
 * cancelling creating a subtask
 */
function cancelNewSubtasks() {
  renderSubtaskSection();
  addTaskSubtasks = [];
}

/**
 * saving subtask
 */
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

/**
 *
 * showing all selected subtasks
 * @param {id of task} id
 * @param {array of subtasks} arr
 */
function createSubtasksSection(id, arr) {
  let subtasksContainer = getId(id);
  subtasksContainer.innerHTML = '';
  for (let i = 0; i < arr.length; i++) {
    const subtask = arr[i];
    if (subtask.checked == true) {
      subtasksContainer.innerHTML += createSubtasksChecked(subtask, i);
    } else {
      subtasksContainer.innerHTML += createSubtasksUnchecked(subtask, i);
    }
  }
}

/**
 * function that changes the subtasks icon when a subtask
 */
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
  document.querySelector('.mainContainer').style = 'overflow: hidden';
  getId('help').innerHTML += createHelpSection();
}

/**
 * close Help Section
 */
function closeHelpSection() {
  document.querySelector('.mainContainer').style = 'overflow: auto';
  getId('help').classList.add('d-none');
  getId('questionMark').classList.remove('d-none');
}

/**
 * showing the Legal Notice Section
 */
function showLegalNotice() {
  getId('help').classList.remove('d-none');
  getId('help').innerHTML = '';
  getId('help').innerHTML += createLegalNotice();
  document.querySelector('.mainContainer').style = 'overflow: hidden';
}

/**
 * vlosing the Legal Notice Section
 */
function closeLegalNotice() {
  getId('help').classList.add('d-none');
  document.querySelector('.mainContainer').style = 'overflow: auto';
}
