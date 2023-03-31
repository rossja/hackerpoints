const User = require('../models/User');

module.exports = (router) => {
  // Create a user
  router.post('/users', async (ctx) => {
    const newUser = new User(ctx.request.body);
    await newUser.save();
    ctx.body = newUser;
  });

  // Get all users
  router.get('/users', async (ctx) => {
    const users = await User.find();
    ctx.body = users;
  });

  // Get a user by ID
  router.get('/users/:id', async (ctx) => {
    const user = await User.findById(ctx.params.id);
    ctx.body = user;
  });

  // Update a user
  router.put('/users/:id', async (ctx) => {
    const updatedUser = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body, { new: true });
    ctx.body = updatedUser;
  });

  // Delete a user
  router.delete('/users/:id', async (ctx) => {
    await User.findByIdAndRemove(ctx.params.id);
    ctx.status = 204;
  });
};
