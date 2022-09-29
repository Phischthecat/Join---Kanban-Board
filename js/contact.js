let contacts = [];
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
