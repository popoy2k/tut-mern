const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;
const itemsAPI = require("./route/api/items");
// DB Config
const db = require("./config/keys").mongoURI;
//IF Error occure when parsing body change to app.use(bodyParser)

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(`Can't connect to MongoDB. [${err}]`));

app.use(express.json());

app.use("/api/items", itemsAPI);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFIle(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(PORT, () => {
  console.log(`Server is running at port:${PORT}`);
});
