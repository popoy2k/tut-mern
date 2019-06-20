const route = require("express").Router();
const Item = require("../../models/item");

route.get("/", (req, res) => {
  Item.find()
    .sort({ data: -1 })
    .then(items => res.json(items));
});
route.post("/", (req, res) => {
  const newItem = Item({
    name: req.body.name
  });
  newItem.save().then(item => res.json(item));
});

route.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(item => {
      item.remove.then(() => {
        res.json({ msg: "Deletion Success" });
      });
    })
    .catch(err => {
      res.status(404).json({ msg: "Invalid Parameters" });
    });
});

module.exports = route;
