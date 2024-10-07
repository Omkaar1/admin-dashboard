const mongoose = require("mongoose");
const MONGO_DB =
  "mongodb+srv://imomkarlondhe:imomkar123@cluster0.2htpj.mongodb.net/?retryWrites=true";
mongoose
  .connect(MONGO_DB)
  .then(() => console.log("DB connect Successfully"))
  .catch((error) => console.log(error.message));
