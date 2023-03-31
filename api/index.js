require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');

const app = new Koa();
const router = new Router();

const dbUri = process.env.HPT_MONGO_URI;

// Connect to MongoDB
mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Middleware
app.use(bodyParser());

// Routes
router.get('/', async (ctx) => {
  ctx.body = 'Welcome to the RESTful API using Koa and MongoDB!';
});

// Users API
require('./routes/users')(router);
// Groups API
require('./routes/groups')(router);

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
