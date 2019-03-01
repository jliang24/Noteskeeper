module.exports = (req, res, next) => {
  if (!req.user) {
    return res.send('You must login!');
  }

  next();
};
