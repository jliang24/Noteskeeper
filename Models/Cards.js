const mongoose = require('mongoose');
const { Schema } = mongoose;

const listSchema = new Schema({
  checkedNames: [String],
  checked: [Boolean],
  items: [String],
  itemNames: [String]
});

const itemSchema = new Schema({
  name: String,
  type: String,
  text: String,
  list: listSchema
});

const cardSchema = new Schema({
  title: String,
  item: [itemSchema],
  _board: { type: Schema.Types.ObjectId, ref: 'Boards' }
});

mongoose.model('Cards', cardSchema);
