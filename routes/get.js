const express = require("express");
const router = express.Router();
const { getData } = require("../controllers/get");

router.get("/get", getData);

module.exports = router;
