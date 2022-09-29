let contacts = [];

async function addContact() {
  let name = getId('newContactName').value;
  let initial = name.charAt(0) + name.charAt(name.indexOf(' ') + 1);
  let contact = {
    initial: initial,
    name: getId('newContactName').value,
    email: getId('newContactEmail').value,
    phone: getId('newContactPhone').value,
  };
  contacts.push(contact);
  await backend.setItem('contacts', contacts);
  getId('newContactForm').reset();
  closeContactBox();
}
