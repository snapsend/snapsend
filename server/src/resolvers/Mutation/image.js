const { getUserId } = require('../../utils');
const { forwardTo } = require('prisma-binding');

const image = {
  async createImage(parent, { envelopeId, data }, ctx, info) {
    const userId = getUserId(ctx);

    /**
     * Steps:
     *  1. Take the data, send it to filestack
     *  2. Get back a url from filestack
     *  3. Save the url to our database (create an image, save that imageId in the respective envelope)
     *  4. Graphql will automatically return a confirmation to the frontend when it's done
     */

    return;

    // THIS IS THE STARTER CODE FROM createPost MUTATION
    // I AM KEEPING IT HERE FOR REFERENCE
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
