const Group = require('../models/Group');

module.exports = (router) => {
  // Create a group
  router.post('/groups', async (ctx) => {
    const newGroup = new Group(ctx.request.body);
    await newGroup.save();
    ctx.body = newGroup;
  });

  // Get all groups
  router.get('/groups', async (ctx) => {
    const groups = await Group.find().populate('creator members');
    ctx.body = groups;
  });

  // Get a group by ID
  router.get('/groups/:id', async (ctx) => {
    const group = await Group.findById(ctx.params.id).populate('creator members');
    ctx.body = group;
  });

  // Update a group
  router.put('/groups/:id', async (ctx) => {
    const updatedGroup = await Group.findByIdAndUpdate(ctx.params.id, ctx.request.body, { new: true }).populate('creator members');
    ctx.body = updatedGroup;
  });

  // Delete a group
  router.delete('/groups/:id', async (ctx) => {
    await Group.findByIdAndRemove(ctx.params.id);
    ctx.status = 204;
  });
};
