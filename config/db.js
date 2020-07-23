const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://sagar:sagar@cluster0.240uk.mongodb.net/<dbname>?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

module.exports = mongoose;
