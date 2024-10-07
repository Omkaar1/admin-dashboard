require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const cors = require("cors");
const router = require("./routes/routers");
var bodyParser = require("body-parser");

const port = 8080;
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
