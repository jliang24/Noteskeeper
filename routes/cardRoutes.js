const requireLogin = require('../middlewares/requireLogin'); 
const mongoose = require('mongoose'); 
const Boards = mongoose.model('Boards'); 
const Card = mongoose.model('Cards');

module.exports = (app) => {
  app.post('/api/cards', requireLogin, async (req, res) => { 
    const { title, type, name, field, boardId } = req.body; 
    const Board = await Boards.findById(boardId); 
    const boardUser = String(Board._user); 
    const user = String(req.user._id)

    if (boardUser !== user){
      return res.status(404).send()
    }

    delete field["title"]
    const listNames = Object.keys(field).filter(name => /listarea/.test(name));
    const listValues = Object.values(field).filter(value => typeof value === 'string'); 
    const checkedNames = Object.keys(field).filter(name => /checkarea/.test(name));
    const checked = Object.values(field).filter(value => typeof value === 'boolean');  

    const card = type === 'text' ? 
    new Card({ title, item: {name, type, [type]:field}, _board: Board}): 
    new Card({ title, item: {type, [type]:field, list: {items: listValues,itemNames: listNames, checkedNames, checked }}, _board: Board}); 
    Board.cardOrder.push(card._id); 

    try {
      await card.save(); 
      await Board.save(); 
      res.send(card)
    } catch (err) {
      res.status(401).send(err)
    }
  }); 

  app.get('/api/boards/:boardId/cards', requireLogin, async (req, res) => {
    const cards = await Card.find({_board: req.params.boardId}); 
    const board = await Boards.findById({ _id: req.params.boardId}); 
    const boardUser = String(board._user); 
    const user = String(req.user._id)
    if (boardUser !== user){
      return res.status(404).send()
    }
    res.send(cards); 
  }); 

  app.patch('/api/cards/:cardId', requireLogin, async (req, res) => {
    console.log(req.body)
    const modifyItem = async (key, modified) => {
      const card = await Card.findById(req.body.cardId); 
      const item = await card.item.id(req.body.itemId); 
      if (!item && req.body.type==="checkbox"){
        card.item[card.item.length-1].list[key].push(req.body.name)
        card.item[card.item.length-1].list[modified].push(req.body.value)
        await card.save(); 
        return res.send(card); 
      }
      let itemSet = false; 
      item.list[key].forEach( (name, index) => {
        if (name === req.body.name){
          item.list[modified].set(index,req.body.value)
          itemSet = true; 
        }
      })

      if (!itemSet){
        item.list[key].push(req.body.name); 
        item.list[modified].push(req.body.value); 
      }

      await item.save({suppressWarning: true})
      await card.save()
      return res.send(card)
    }; 

    if (req.body.type === 'checkbox'){
      return modifyItem('checkedNames', 'checked'); 
    }

    if (req.body.type === 'list'){
      const card = await Card.findById(req.body.cardId); 
      const item = await card.item.id(req.body.itemId); 
      if (!item){
        const item = {
          type: req.body.type,
          list: {
            itemNames: req.body.name,
            items: req.body.value
          }
        }
        await card.item.push(item)
        await card.save(); 
        return res.send(card); 
      }
      return modifyItem('itemNames','items'); 
    }


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

    if (!card && req.body.type==='text'){
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

  app.put('/api/cards/:cardId', requireLogin, async (req, res) => {
    await Card.findOneAndUpdate(
      {
        _id: req.params.cardId, 
      },
      {
        $set: {'item': req.body.items}
      },
      {new: true}
    ).exec(); 

    res.send('/'); 
  })

  app.delete('/api/boards/:boardId/cards/:id', requireLogin, async (req,res) => {
    const update = await Boards.findByIdAndUpdate(
      {_id: req.params.boardId} ,
      {
        $pull: { cardOrder: req.params.id}
      }
    )

    await Card.find({_id: req.params.id}).deleteOne().exec(); 
    res.send('/'); 
  })
}