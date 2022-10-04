let contacts = [];
let contactListLetters = [];
// contacts = [
//   {
//     initial: 'PS',
//     name: 'Phil Schmucker',
//     email: 'ps@web.de',
//     phone: '123456',
//   },
//   {
//     initial: 'RD',
//     name: 'Rico Denkewitz',
//     email: 'rd@web.de',
//     phone: '1651651651',
//   },
//   { initial: 'RM', name: 'Riso Miso', email: 'pi@web.de', phone: '123456' },
//   { initial: 'PS', name: 'Phil Schmu', email: 'pe@web.de', phone: '123456' },
// ];

async function initContact() {
  await init();
  lettersOfContactList();
  generateContactSectionsForLetters();
}

async function addContact() {
  let name = getId('newContactName').value;
  let initial = name.charAt(0) + name.charAt(name.indexOf(' ') + 1);
  let contact = {
    initial: initial.toUpperCase(),
    name: name,
    email: getId('newContactEmail').value,
    phone: getId('newContactPhone').value,
  };
  contacts.push(contact);
  await backend.setItem('contacts', contacts);
  getId('newContactForm').reset();
  closeContactBox();
  openDialogForCreate('Contact successfully created');
  initContact();
}

async function saveContact(i) {
  let fullContact = getId('contactView');
  contacts[i].initial = getId('editContactInitial').innerHTML.trim();
  contacts[i].name = getId('editContactName').value;
  contacts[i].email = getId('editContactEmail').value;
  contacts[i].phone = getId('editContactPhone').value;
  await backend.setItem('contacts', contacts);
  closeContactBox();
  openDialogForCreate('Contact successfully edited');
  initContact();
  showContact(fullContact, i);
}

function openDialogForCreate(text) {
  let message = getId('messageToBoard');
  message.innerHTML = text;
  message.classList.remove('d-none');
  setTimeout(() => {
    message.classList.add('slide-out-bottom');
  }, 2000);
}

function lettersOfContactList() {
  for (let i = 0; i < contacts.length; i++) {
    if (!contactListLetters.includes(contacts[i].name.charAt(0))) {
      contactListLetters.push(contacts[i].name.charAt(0).toUpperCase());
    }
  }
  contactListLetters.sort();
}

function createContactSectionOfLetter(letter) {
  return /* html*/ `
<div class="contactSection">
  <div class="contactSectionHeader">
    <h2>${letter}</h2>
    <hr />
  </div>
  <div id="contactsOf${letter}" class="contactsOf"></div>
</div>
  `;
}

function createContact(contact, i) {
  return /* html */ `
  <div class="contactInfo cursor-pointer" onclick="showFullContact(${i})">
    <div class="initials initialCircle">${contact.initial.toUpperCase()}</div>
    <div>
      <div class="name">${contact.name}</div>
      <div class="email">${contact.email}</div>
    </div>
  </div>
  `;
}

function generateContactSectionsForLetters() {
  let contactList = getId('contactList');
  contactList.innerHTML = '';
  for (let i = 0; i < contactListLetters.length; i++) {
    const letter = contactListLetters[i];
    contactList.innerHTML += createContactSectionOfLetter(letter);
    generateContacts(letter);
  }
}

function generateContacts(letter) {
  let letterContainer = getId('contactsOf' + letter);
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    if (contact.name.charAt(0).toUpperCase() == letter) {
      letterContainer.innerHTML += createContact(contact, i);
    }
  }
}

function showFullContact(i) {
  let fullContact = getId('contactView');
  if (fullContact.classList.contains('slide-in-right')) {
    changeContact(fullContact, i);
  } else {
    fullContact.classList.add('slide-in-right');
    showContact(fullContact, i);
  }
}

function changeContact(fullContact, i) {
  fullContact.classList.remove('slide-in-right');
  fullContact.classList.add('slide-out-right');
  setTimeout(() => {
    fullContact.classList.remove('slide-out-right');
    fullContact.classList.add('slide-in-right');
    showContact(fullContact, i);
  }, 750);
}

function showContact(fullContact, i) {
  fullContact.innerHTML = createFullContact(i);
  fullContact.classList.remove('d-none');
}

function createFullContact(i) {
  let contact = contacts[i];
  return /*html*/ `
  <div class="headerFullContact">
                  <div
                    id="initialsFullContact"
                    class="initialsFullContact initialCircle"
                  >
                    ${contact.initial}
                  </div>
                  <div class="nameContainer">
                    <div class="nameFullContact">${contact.name}</div>
                    <div
                      class="addTaskLink cursor-pointer"
                      onclick="openTaskBox('toDo')"
                    >
                      <span>+</span> Add Task
                    </div>
                  </div>
                </div>
                <div class="contactFullInfo">
                  <div class="contactFullInfoHeader">
                    <h2>Contact Information</h2>
                    <div
                      class="editContact cursor-pointer"
                      onclick="openContactBox(editContact, ${i})"
                    >
                      <img src="./img/pencil.svg" alt="pencil" />
                      Edit Contact
                    </div>
                  </div>
                  <div class="emailFullContact">
                    <h3>Email</h3>
                    <a class="email" href="mailto:antom@gmail.com"
                      >${contact.email}</a
                    >
                  </div>
                  <div class="phoneFullContact">
                    <h3>Phone</h3>
                    <a href="tel:+49${contact.phone}">${contact.phone}</a>
                  </div>
                </div>
              </div>
            </div>
  `;
}
