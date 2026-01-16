const app = require("./app");
const mongoose = require("mongoose");

const PORT = 3000;
const MONGO_URI = "mongodb://127.0.0.1:27017/query_app"; // change if needed

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    // Start server after DB is connected
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
