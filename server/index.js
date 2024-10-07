require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const cors = require("cors");
const router = require("./routes/routers");
var bodyParser = require("body-parser");

const corsOptions = {
  origin: [
    "http://localhost:5050",
    "https://admin-dashboard-ochre-phi.vercel.app/",
  ], // Add Vercel URL here
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const port = 8080;
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
