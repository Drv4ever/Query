const mongoose = require('mongoose');

const ansSchemea = new mongoose.Schema({
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
},
{timestamp : true}
);

module.export = mongoose.model('answer',ansSchemea)