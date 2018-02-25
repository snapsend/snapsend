const { getUserId } = require('../../utils');
const { forwardTo } = require('prisma-binding');

const image = {
  async createImage(parent, { title, text }, ctx, info) {
    const userId = getUserId(ctx);

    return;

    // need to write this for ourselves
    /** 
    return ctx.db.mutation.createPost(
      {
        data: {
          title,
          text,
          isPublished: false,
          author: {
            connect: { id: userId },
          },
        },
      },
      info
    );
    */
  },
};

module.exports = { image };
