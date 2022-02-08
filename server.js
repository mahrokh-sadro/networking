const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

if (process.env.NODE_ENV != "production") {
  require("dotenv").config({ path: "config/keys.env" });
}
const app = express();

const corsOptionsDelegate = function (req, callback) {
  const allowlist = [`http://localhost:3000`, "http://127.0.0.1:3000"];
  let corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`main`);
});

app.use("/users", require("./routes/users"));
app.use("/auth", require("./routes/auth"));
app.use("/profile", require("./routes/profile"));
app.use("/posts", require("./routes/posts"));

const HTTP_PORT = process.env.PORT || 5000;

app.listen(HTTP_PORT, () => {
  console.log(`app listening on `);

  mongoose
    .connect(process.env.MONGO_DB_CONNECTION_STRING)
    .then(() => {
      console.log("connected to db " + HTTP_PORT);
    })
    .catch((err) => {
      console.log(err);
    });
});
