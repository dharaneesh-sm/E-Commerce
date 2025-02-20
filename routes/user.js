const express = require('express');
const router = express.Router();

const { getAllUsers, getUserByID, addNewUser, removeUser } = require('../controllers/user');

router.route("/users").get(getAllUsers);
router.route("/user/:id").get(getUserByID);
router.route("/addUser").post(addNewUser);
router.route("/removeUser/:id").delete(removeUser);

module.exports = router;