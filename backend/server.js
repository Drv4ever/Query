// require('dotenc').config();

const app = require('./app');
const connectDB = require("./config/db");

const PORT = 3000;

connectDB();

app.listen(PORT, ()=>{
    console.log(`server running at localhost :${PORT}`);
});



// 