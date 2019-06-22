const route = require("express").Router();
const Item = require("../../models/item");
const authToken = require("../../middleware/auth");
route.get("/", (req, res) => {
  Item.find()
    .sort({ data: -1 })
    .then(items => res.json(items));
});

route.get("/:id", (req, res) => {
  Item.findById(req.params.id).then(cb => {
    res.json({ item: cb });
  });
});

route.post("/", authToken, (req, res) => {
  const newItem = Item({
    name: req.body.name
  });
  newItem.save().then(item => res.json(item));
});

route.delete("/:id", authToken, (req, res) => {
  Item.findById(req.params.id)
    .then(item => {
      item.remove({}).then(() => {
        res.json({ _id: req.params.id });
      });
    })
    .catch(err => {
      res.status(404).json({ msg: err });
    });
});

module.exports = route;
