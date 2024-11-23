const express = require("express");
const { getUsers, blockUser } = require("../controllers/userController");
const router = express.Router();

router.get("/", getUsers);
router.patch("/block/:id", blockUser);

module.exports = router;
