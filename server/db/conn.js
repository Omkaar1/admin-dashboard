const mongoose = require("mongoose");

const MONGO_DB =
  process.env.MONGO_URI ||
  "mongodb+srv://imomkarlondhe:imomkar123@cluster0.2htpj.mongodb.net/?retryWrites=true";

mongoose
  .connect(MONGO_DB)
  .then(() => console.log("DB Connected Successfully"))
  .catch((error) => console.log(error.message));
