const express = require("express");
const cors = require("cors");

const questionRoutes = require("./routes/questionroutes");
const answerRoutes = require("./routes/answerroutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/questions", questionRoutes);
app.use("/api/answers", answerRoutes);

module.exports = app;
