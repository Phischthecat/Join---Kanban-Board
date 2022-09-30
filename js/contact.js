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
}

//todo_phil
// async function saveContact() {
//   let name = getId('newContactName').value;
//   let initial = name.charAt(0) + name.charAt(name.indexOf(' ') + 1);
// }

function openDialog(text) {
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

function createContact(contact) {
  return /* html */ `
  <div class="contactInfo cursor-pointer" onclick="showFullContact()">
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
      letterContainer.innerHTML += createContact(contact);
    }
  }
}
