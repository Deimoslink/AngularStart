const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('backend/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.get('/get-error', (req, res) => {
  res.status(parseInt(req.query.error));
  res.send();
});

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now() // Adds timestamp for each post request
  }
  next();
});


server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running')
});





