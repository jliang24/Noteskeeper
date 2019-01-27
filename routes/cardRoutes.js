const requireLogin = require('../middlewares/requireLogin'); 
const mongoose = require('mongoose'); 
const Boards = mongoose.model('Boards'); 
const Card = mongoose.model('Cards')

module.exports = (app) => {
  app.post('/api/cards', requireLogin, async (req, res) => { 
    console.log(req.body)
    const { title, type, name, field, boardId } = req.body; 
    const Board = await Boards.findById(boardId); 
    const card = new Card({
      title,
      item: {name, type, [type]:field}, 
      _board: Board
    }); 

    try {
      await card.save(); 
      res.send(card)
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
      }
    ).exec(); 
    res.send(card); 
  }); 
}