const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      default: "anonymous",
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true } // fixed typo
);

module.exports = mongoose.model('Answer', answerSchema); // fixed typo and capitalization
