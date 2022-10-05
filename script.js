// [#0038ff,#e200be,#ff8a00,#2ad300,#ff0000,#8aa4ff] Category colors
let categorys = [
  {
    name: 'Sales',
    color: '#fc71ff',
  },
  {
    name: 'Backoffice',
    color: '#1fd7c1',
  },
];

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
  setTimeout(() => {
    getId('animation').classList.toggle('slide-in-right');
    getId('animation').classList.toggle('fade-in');
    renderAssignedToContacts;
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

async function renderAssignedToContacts() {
  let contactSelection = getId('assignedToList');
  contactSelection.innerHTML = '';
  for (let i = 0; i < contacts.length; i++) {
    contactSelection.innerHTML += contactsAssignedTo(i);
  }
}

let selectBtns = document.querySelectorAll('.select-btn');

selectBtns.forEach((selectBtn) => {
  selectBtn.addEventListener('click', () => {
    selectBtn.classList.toggle('open');
    const items = document.querySelectorAll('.item');
    items.forEach((item) => {
      item.addEventListener('click', () => {
        item.classList.toggle('checked');
      });
    });
  });
});

function renderChoosenCategorys() {
  let categoryList = getId('categoryList');
  categoryList.innerHTML = createCategoryDefault();
  for (let i = 0; i < categorys.length; i++) {
    categoryList.innerHTML += createChoosenCategorys(i);
  }
}

function addNewCategory() {
  let newCategory = getId('categorySelect');
  newCategory.removeAttribute('class');
  newCategory.innerHTML = createInputForNewCategory();
}

function createInputForNewCategory() {
  return /*html*/ `
  <div class="newCategoryContainer">
    <input class="newCategoryInput" type="text">
    <span class="cancel-btn" onclick="renderCategorySelection()">
    <i class="fa-solid fa-xmark"></i>
    </span>
    <span class="check-btn" onclick="saveNewCategory()">
    <i class="fa-solid fa-check"></i>
    </span>    

  </div>
    `;
}

function renderCategorySelection() {
  let categorySelection = getId('categorySelect');
  categorySelection.innerHTML = createCategorySelection();
  categorySelection.classList.add('select-btn');
}

function createCategorySelection() {
  return /*html*/ `
  <span class="btn-text">Choose category</span>
                  <span class="arrow-down">
                    <i class="fa-solid fa-caret-down"></i>
                  </span>
  `;
}

function saveNewCategory() {
  console.log(document.querySelector('.newCategoryInput').value);
  renderCategorySelection();
  renderChoosenCategorys();
}
