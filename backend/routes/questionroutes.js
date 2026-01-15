const express = require('express');

const Question = require('../models/question');

const router = express.Router();

// creating  question 

router.post('/',async(req,res)=>{
    try {
    const question = await Question.create(req.body);
    res.status(201).json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// get all question 

router.post('/',async(req,res)=>{
    try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get one questio 

router.get("/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    res.json(question);
  } catch (err) {
    res.status(404).json({ error: "Question not found" });
  }
});

module.exports = router;