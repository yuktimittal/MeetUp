const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
});

module.exports = mongoose.model("Category", CategorySchema);
