const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/auth/google', { target: 'http://localhost:8000' }));
  app.use(proxy('/api/*', { target: 'http://localhost:8000' }));
  app.use(proxy('/api/boards/*', { target: 'http://localhost:8000' }));
  app.use(proxy('/api/boards/*/cards', { target: 'http://localhost:8000' }));
  app.use(proxy('/api/boards/*/cards/*', { target: 'http://localhost:8000' }));
  app.use(proxy('/api/cards/*', { target: 'http://localhost:8000' }));
};
