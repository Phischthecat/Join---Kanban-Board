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

function generateRandomColor() {
  let randomColor = Math.floor(Math.random() * 16777215).toString(16);
  if (randomColor.length == 5) {
    return (randomColor = '0' + randomColor);
  } else {
    return randomColor;
  }
}

async function addContact() {
  let name = getId('newContactName').value;
  let initial = contactInitial(name);
  let contact = {
    initial: initial.toUpperCase(),
    color: generateRandomColor(),
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

function contactInitial(name) {
  if (name.indexOf(' ') == -1) {
    return name.charAt(0);
  } else {
    return name.charAt(0) + name.charAt(name.indexOf(' ') + 1);
  }
}

async function saveContact(i) {
  let fullContact = getId('contactView');
  contacts[i].name = getId('editContactName').value.trim();
  contacts[i].initial = contactInitial(contacts[i].name);
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
  fullContact.className = 'slide-out-right';
  setTimeout(() => {
    fullContact.className = 'slide-in-right';
    showContact(fullContact, i);
  }, 750);
}

function showContact(fullContact, i) {
  fullContact.innerHTML = createFullContact(i);
  fullContact.classList.remove('d-none');
}
