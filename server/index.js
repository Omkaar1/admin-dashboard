const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("./routes/authRouter");

require("dotenv").config();
require("./db/conn");
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", authRouter);

app.get("/ping", (req, res) => {
  res.send("PONG");
});
app.listen(port, () => {
  console.log(`listening on port ${port} http://localhost:${port}`);
});
