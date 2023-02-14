const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@chat-app-database.7yafmjv.mongodb.net/?retryWrites=true&w=majority`,
  () => {
    console.log("Mongo DB connected successfully.");
  }
);
