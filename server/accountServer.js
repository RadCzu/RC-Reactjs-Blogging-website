const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('data/db.json');
const middlewares = jsonServer.defaults();
const cors = require('cors');


server.use(jsonServer.bodyParser);
server.use(cors());

server.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  console.log("username:" + username, " passowrd: " + password);
  const users = router.db.get('users').value();
  const user = users.find(user => user.name === username && user.password === password);
  if (user) {
    res.status(200).json({ success: true, user: user.name, id: user.id });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

server.post('/auth/sign-up', (req, res) => {
  const { username } = req.body;
  console.log("username:" + username);
  const users = router.db.get('users').value();
  const user = users.find(user => user.name === username);
  console.log("index: " + index);
  if (!user) {
    res.status(200).json({ success: true, user: user.user, index: user.id});
  } else {
    res.status(401).json({ success: false, message: 'Username already in database' });
  }
});

server.get('/auth/login', (req, res) => {
  res.json([]);
});

server.get('/auth/sign-up', (req, res) => {
  res.json([]);
});


server.use(middlewares);
server.use(router);

server.listen(8000, () => {
  console.log('JSON Server is running on port 8000');
});