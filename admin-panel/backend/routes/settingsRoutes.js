const express = require("express");
const { updateSettings } = require("../controllers/settingsController");
const router = express.Router();

router.post("/update", updateSettings);

module.exports = router;
