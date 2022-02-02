const express = require("express");
const mongoose = require("mongoose");

if (process.env.NODE_ENV != "production") {
  require("dotenv").config({ path: "config/keys.env" });
}
const app = express();
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
