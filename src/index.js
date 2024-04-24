import { program } from "commander";
import Contacts from "./contacts";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await Contacts.listContacts();
      break;

    case "get":
      const contact = await Contacts.getContactById();
      break;

    case "add":
      const newContact = await Contacts.addContact(name, email, phone);
      break;

    case "remove":
      const removedContact = await Contacts.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
