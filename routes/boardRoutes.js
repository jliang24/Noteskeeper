const requireLogin = require('../middlewares/requireLogin'); 
const mongoose = require('mongoose'); 

const Boards = mongoose.model('Boards')

module.exports = (app) => {
  app.post('/api/boards', requireLogin, async (req, res) => { 
    const { title } = req.body; 

    const board = new Boards({
      title,
      _user: req.user.id
    })

    try {
      await board.save(); 
      res.send(board.id)
    } catch (err) {
      res.status(401).send(err)
    }
  })

  app.get('/api/boards/:id', requireLogin, async (req, res) => {
    const board = await Boards.findById({_id: req.params.id }); 
    res.send(board); 
  })

  app.get('/api/boards/', requireLogin, async (req, res) => {
    const boards = await Boards.find({_user: req.user.id}); 
    res.send(boards); 
  })

  app.delete('/api/boards/:id', requireLogin, async (req,res) => {
    await Boards.find({_id: req.params.id}).deleteOne().exec(); 
    res.send('/'); 
  })

  app.patch('/api/boards/:boardId', requireLogin, async (req, res) => {
    await Boards.findOneAndUpdate(
      {
        _id: req.params.boardId, 
      },
      {
        $set: {'cardOrder': req.body.cardOrder}
      }
    ).exec(); 

    res.send('/'); 
  })
}