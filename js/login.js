let users = [];
let loggedIn = true;
let exists = false;
let responsive = true;
let actualLoggedUser;
// let rememberme = getId('remember');
// console.log(rememberme.checked);


/**
 * This function is used for controlling password and username
 */

async function checkAllUsers() {
  let nameToCheck = getId('userName').value;
  let passwordToCheck = getId('password').value;
  let name = users.find(n => n.userName == nameToCheck);
  let password = users.find(n => n.password == passwordToCheck);
  if (name && password) {
    getId('loginError').innerHTML = '';
    name.logStatus = 'loggedIn';
    login();
  } else {
    getId('loginError').innerHTML = '';
    getId('loginError').innerHTML += createErrorBoxLogin();
    getId('password').value = '';
  }
}


/**
 * if all condistions are true you will be able to login
 */
async function login() {
  await backend.setItem('users', users);
  setTimeout(() => {
    window.location.href = './summary.html';
    setDefault();
  }, 200)
}



/**
 * This function is used for checking or setting the registration
 */
async function getRegistrated() {
  let actualUser = {
    userName: getId('userName').value,
    password: getId('password').value,
    email: getId('email').value,
    logStatus: ''
  }
  checkConditions();
  if (exists) {
    users.push(actualUser);
    await backend.setItem('users', users);
    setDefault();
    window.location.href = './summary.html';
  }
}


/**
 * This functon is used to check if All Conditions are true  
 */
function checkConditions() {
  if (users.length >= 0 && getId('userName') != '' && getId('password').value != '' && getId('email').value != '') {
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
    })
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
  // let users = [];
  // await backend.setItem('users', users);
  setInterval(() => {
    window.addEventListener("resize", removeClass());
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