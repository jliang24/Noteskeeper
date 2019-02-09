const mongoose = require('mongoose'); 
const { Schema } = mongoose; 

const boardSchema = new Schema({
  title: String, 
  cardOrder: [String], 
  _user: { type: Schema.Types.ObjectId, ref:'User' }
})

mongoose.model('Boards', boardSchema); 