const mongoose = require('mongoose'); 
const { Schema } = mongoose; 
const itemSchema = new Schema({
  name: String, 
  text: String,
  list: [String],
  checked: [Boolean]
})

const cardSchema = new Schema({
  title: String, 
  item: [itemSchema],
  _board: {type: Schema.Types.ObjectId, ref:'Boards'}
})

mongoose.model('Cards', cardSchema); 