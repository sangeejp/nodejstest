const express = require("express");

const Controller = require("../controllers/quotes");



const router = express.Router();
router.post("",   Controller.createQuote);
router.put("",    Controller.updateQuote);
router.get("/:id",    Controller.getQuoteById);




  module.exports = router;