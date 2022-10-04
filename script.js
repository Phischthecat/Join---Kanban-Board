async function init() {
  await downloadFromServer();
  allTasks = (await backend.getItem('tasks')) || [];
  users = (await backend.getItem('users')) || [];
  contacts = (await backend.getItem('contacts')) || [];
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

async function openTaskBox(pickedContainer) {
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    w3IncludeHTML();
  }, 100);
  let box = document.getElementById('taskBox');
  box.innerHTML = createTaskBox();
  setTimeout(() => {
    getId('animation').classList.toggle('slide-in-right');
    getId('animation').classList.toggle('fade-in');
    renderContactsToAddTask();
  }, 300);
  setTimeout(() => {
    if (box.classList.contains('d-none')) {
      box.classList.remove('d-none');
    }
    document.getElementById('animation').classList.toggle('background');
    showBtn(pickedContainer);
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

async function showBtn(pickedContainer) {
  document.getElementById('buttonContainer').innerHTML =
    createBoxBtns(pickedContainer);
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

function renderContactsToAddTask() {
  let contactSelection = getId('assignedToPeople');
  contactSelection.innerHTML = /*html*/ `<option>You</option>`;
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    contactSelection.innerHTML += /*html*/ `
    <option value="${contact.name}">${contact.name}</option>
    `;
  }
}
