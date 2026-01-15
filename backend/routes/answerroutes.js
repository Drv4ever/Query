const express = require('express');

const Answer = require("../models/answer");

const router = express.Router();


// add answer
router.post("/",async (req,res)=>{
    try {
    const answer = await Answer.create(req.body);
    res.status(201).json(answer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})


// get answer for a question 


router.get("/:questionId", async (req, res) => {
  try {
    const answers = await Answer.find({
      questionId: req.params.questionId,
    }).sort({ createdAt: -1 });

    res.json(answers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;