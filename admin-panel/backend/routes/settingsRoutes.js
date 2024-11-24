const express = require("express");
const { updateSettings } = require("../controllers/settingsController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/update", authMiddleware, updateSettings);

module.exports = router;
