let users = [];
let loggedIn = true;
let exists = false;
let actualLoggedUser;

function showMessageForCoaches() {
  getId('messageForCoaches').innerHTML += /*html*/`
  <div class="coachbox">
    <h1>Bitte vor der Bewertung von Join lesen.  Wichtig!</h1>

    <div>
      <span>Hallo liebe Coaches, <br>
      Vor dem Projekt möchte ich sagen , dass Ich Rico Denkewitz neben dem alten Join Mockup, was damals meine Gruppenarbeit war,ich mich entschlossen habe das neue umzusetzen und mir 2 Leute gesucht habe die mitmachen weil meine alte Gruppe das als zuviel Arbeit empfand.<br>
      Mit <b> Phil Schmucker </b> und <b> Tom Petri </b> habe ich das Projekt dann weiter umgesetzt.
      Noch bevor es Pflicht wurde join im Modul Scrum abzugeben saßen wir bereits dadran und haben es anschließend auch gemeinsam fertig gestellt. Nach Abnahme des Projekts würde ich euch bitten, Phil Schmucker , wenn er sein Sharkie abgegeben hat und das akzeptiert wurde direkt Angular freizuschalten. <br>
      Sollte es Kritik geben welche natürlich umgesetzt wird , haben wir 3 exakt das gleiche Join und bei ihm muss es ja dann keiner zweiten Kontrolle unterzogen werden wenn es bei mir bereits abgenommen wurde.
      Tom Petri und ich haben bereits durch eine bug angular frei aber wollen trz alle ein abgenommenes Join haben weshalb wir das ganze trz abgeben obwohl wir bereits weitere module frei haben. <br>

      Ich danke fürs lesen und wünsche einen angenehmen Abend oder Tag je nachdem wann es gelesen wird. <br>

      Diese Nachricht wird natürlich nach Abnahme des Projekts rausgenommen , deswegen bitte nicht wundern das die erste function der login.js so lang ist. <br>

      nun aber Viel Spaß an unserem Join 🙂

      <br>
      <br>
      <br>
      Mit freundlichen Grüßen, <br>
      <i>Rico Denkewitz</i>
    </span>
    </div>


    <button onclick="closeCoachBox()"> Ok</button>
  </div>
  `
}

function closeCoachBox() {
  document.querySelector('.coachbox').classList.add('d-none');
}












/**
 * This function is used for controlling password and username
 */
async function checkAllUsers() {
  let name = getUser();
  if (name && name.userName && name.password == getId('password').value && getId('remember').checked) {
    conditionsAreTrue(name);
  } else if (name && name.userName && name.password == getId('password').value) {
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
  } else if (getId('userName').value != '' && getId('password').value != '') {
    showError();
    console.log(name);
  }
}

/**
 * 
 * @param {name from actual user} name 
 */
function conditionsAreTrue(name) {
  let rememberedUser = JSON.stringify(name);
  localStorage.setItem('rememberMe', rememberedUser);
  getId('loginError').innerHTML = '';
  name.logStatus = 'loggedIn';
  login();
}


/**
 * initialising the Login Section
 */
async function initBoard() {
  await init();
  if (users.length > 0) {
    checkForRemember();
    logAllUsersOut();
  }

  setTimeout(() => {
    showMessageForCoaches();
  }, 2000);
}

/**
 * Function for logging out
 */
async function logAllUsersOut() {
  users.forEach((user) => {
    user.logStatus = '';
  });
  await backend.setItem('users', users);
}

/**
 * shows error message
 */
function showError() {
  getId('loginError').style.opacity = '1';
  setTimeout(() => {
    getId('loginError').style.opacity = '0';
  }, 2000);
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
  if (users.length > 0) {
    users.forEach((user) => {
      let error = getId('errorMessage');
      if (
        user.userName != getId('userName').value &&
        user.email != getId('email').value
      ) {
        exists = true;
      } else if (user.userName == getId('userName').value) {
        error.innerHTML = createErrorName();
        setTimeout(() => {
          error.innerHTML = '';
        }, 2000);
      } else if (user.email == getId('email').value) {
        error.innerHTML = createErrorEmail();
        setTimeout(() => {
          error.innerHTML = '';
        }, 2000);
      }
    });
  } else {
    exists = true;
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

/**
 * shows the Section when you forget your password
 */
function openForgotPart() {
  let content = getId('content');
  responsive = false;
  content.innerHTML = '';
  content.innerHTML += createForgetPart();
}