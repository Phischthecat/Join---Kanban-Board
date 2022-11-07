let users = [];
let loggedIn = true;
let exists = false;
let responsive = true;
let actualLoggedUser;

/**
 * This function is used for controlling password and username
 */
async function checkAllUsers() {
  let name = getUser();
  if (
    name &&
    name.userName &&
    name.password == getId('password').value &&
    getId('remember').checked
  ) {
    let rememberedUser = JSON.stringify(name);
    localStorage.setItem('rememberMe', rememberedUser);
    getId('loginError').innerHTML = '';
    name.logStatus = 'loggedIn';
    login();
  } else if (
    name &&
    name.userName &&
    name.password == getId('password').value
  ) {
    getId('loginError').innerHTML = '';
    name.logStatus = 'loggedIn';
    login();
  } else if (
    (getId('userName').value != '' &&
      getId('password').value != '' &&
      getId('password').value != name.password) ||
    name != getId('userName')
  ) {
    showError();
  }
}

async function initBoard() {
  await init();
  checkForResponsive();
  checkForRemember();
  logAllUsersOut();
}

async function logAllUsersOut() {
  users.forEach((user) => {
    user.logStatus = '';
  });
  await backend.setItem('users', users);
}

/**
 * showErrorMessage
 */
function showError() {
  getId('loginError').innerHTML = '';
  getId('loginError').innerHTML += createErrorBoxLogin();
  getId('password').value = '';
}

/**
 *
 * @returns the founded name for Login
 */
function getUser() {
  let nameToCheck = getId('userName').value;
  let name = users.find((n) => n.userName == nameToCheck);
  return name;
}

/**
 * checks Conditions for rememberMe
 */
function checkForRemember() {
  if (localStorage.getItem('rememberMe')) {
    let name = JSON.parse(localStorage.getItem('rememberMe'));
    getId('userName').value = name.userName;
    getId('password').value = name.password;
    getId('remember').checked = false;
  }
}

/**
 * if all condistions are true you will be able to login
 */
async function login() {
  await backend.setItem('users', users);
  document.querySelector('.loginForm').reset();
  setTimeout(() => {
    window.location.href = './summary.html';
    setDefault();
  }, 200);
}

/**
 * This function is used for checking or setting the registration
 */
async function getRegistrated() {
  let actualUser = {
    userName: getId('userName').value,
    password: getId('password').value,
    email: getId('email').value,
    logStatus: '',
  };
  checkConditions();
  if (exists) {
    users.push(actualUser);
    await backend.setItem('users', users);
    setDefault();
    window.location.href = './index.html';
  }
}

/**
 * This functon is used to check if All Conditions are true
 */
function checkConditions() {
  if (
    users.length >= 0 &&
    getId('userName') != '' &&
    getId('password').value != '' &&
    getId('email').value != ''
  ) {
    exists = true;
  } else {
    users.forEach((user) => {
      let error = getId('errorMessage');
      if (user.userName == getId('userName').value) {
        error.innerHTML = '';
        error.innerHTML += createErrorName();
      } else if (user.email == getId('email').value) {
        error.innerHTML = '';
        error.innerHTML += createErrorEmail();
      }
    });
  }
}

/**
 * This function redirects to register.html
 */
function signUp() {
  window.location.href = './register.html';
}

/**
 * This function goes back to index.html
 */
function backToLogin() {
  window.location.href = './index.html';
}

/**
 * A simple Guest Login
 */
function guestLogin() {
  setDefault();
  logAllUsersOut();
  localStorage.removeItem('rememberMe');
  window.location.href = './summary.html';
}

/**
 * This function is for setting an default variable to the local storage
 * and as soon as possible in the backend for The checkIfUserIsLoggedIn Function
 */
function setDefault() {
  if (localStorage.getItem('loggedInKey') === null) {
    localStorage.setItem('loggedInKey', loggedIn);
  }
}

function openForgotPart() {
  let content = getId('content');
  responsive = false;
  content.innerHTML = '';
  content.innerHTML += createForgetPart();
}

async function checkForResponsive() {
  setInterval(() => {
    window.addEventListener('resize', removeClass());
  }, 200);
}

function removeClass() {
  if (window.innerWidth < 540 && responsive) {
    getId('responsiveSpan').classList.remove('d-none');
    getId('responsiveBtn').classList.remove('d-none');
  } else if (window.innerWidth > 540 && responsive) {
    getId('responsiveSpan').classList.add('d-none');
    getId('responsiveBtn').classList.add('d-none');
  }
}
