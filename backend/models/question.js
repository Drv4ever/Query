
const mongoose = require('mongoose');
const {Schema} = mongoose;



const questionSchema = new mongoose.Schema({
   
    title:{
     type: String ,
     required : true,
     trim:   true,
    },
    description:{
        type:String,
        required :  true,
    },
},
{timestamps: true}
);


module.exports = mongoose.model('question', questionSchema);






