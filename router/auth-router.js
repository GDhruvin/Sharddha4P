const express = require('express');
const router = express.Router();
const authControllers = require("../cantroller/auth-cantroller");

router.route("/contacts").get(authControllers.contact);
router.route("/addContacts").post(authControllers.addContact);
router.route("/updateContacts/:id").patch(authControllers.updateUserByID);
router.route("/deleteContacts/:id").delete(authControllers.deleteUserByID);
router.route("/addNewEntry").post(authControllers.addEntry);
router.route("/enties/:id/:month").get(authControllers.getEntryByID);
router.route("/totalValue/:id/:month").get(authControllers.getTotalValue);
router.route("/updateEntry/:id").patch(authControllers.updateEntryByID);

module.exports = router;