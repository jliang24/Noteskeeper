const requireLogin = require('../middlewares/requireLogin'); 
const mongoose = require('mongoose'); 
const Boards = mongoose.model('Boards'); 
const Card = mongoose.model('Cards'); 

module.exports = (app) => {
  app.post('/api/cards', requireLogin, async (req, res) => { 
    const { title, type, name, field, boardId } = req.body; 
    const Board = await Boards.findById(boardId); 
    const listNames = Object.keys(field);
    const listValues = Object.values(field); 
    const card = type === 'text' ? 
    new Card({ title, item: {name, type, [type]:field}, _board: Board}): 
    new Card({ title, item: {type, [type]:field, list: {items: listValues,itemNames: listNames }}, _board: Board}); 

    try {
      await card.save(); 
      res.send(card)
      console.log(card)
    } catch (err) {
      res.status(401).send(err)
    }
  }); 

  app.get('/api/boards/:boardId/cards', requireLogin, async (req, res) => {
    const cards = await Card.find({_board: req.params.boardId}); 
    res.send(cards); 
  }); 

  app.patch('/api/cards/:cardId', requireLogin, async (req, res) => {
    console.log(req.body); 
    const card = await Card.findOneAndUpdate(
      {
        _id: req.body.cardId, 
        item: {
          $elemMatch: { name: req.body.name }
        }
      },
      {
        $set: { 'item.$.text': req.body.value}
      },
      {new: true}
    ).exec(); 
    console.log(card); 
    if (!card){
      const item = {
        name: req.body.name, 
        text: req.body.value,
        type: req.body.type
      }
      const card = await Card.findById(req.body.cardId); 
      await card.item.push(item)
      await card.save(); 
      return res.send(card); 
    }
    res.send(card); 
  }); 
}