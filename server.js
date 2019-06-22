const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const config = require("config");

const PORT = process.env.PORT || 5000;
// Route Instance
const itemsAPI = require("./route/api/items");
const userAPI = require("./route/api/user");
const authAPI = require("./route/api/auth");

// DB Config
const db = config.get("mongoURI");

// MongoDB Instance
mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(`Can't connect to MongoDB. [${err}]`));

// Parsing request body
app.use(express.json());

//Routes
app.use("/api/items", itemsAPI);
app.use("/api/user", userAPI);
app.use("/api/auth", authAPI);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFIle(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(PORT, () => {
  console.log(`Server is running at port:${PORT}`);
});
