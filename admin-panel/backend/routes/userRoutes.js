const express = require("express");
const { getUsers, blockUser } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getUsers);
router.patch("/block/:chatId", authMiddleware, blockUser);

module.exports = router;
