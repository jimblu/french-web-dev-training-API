import fastifyPlugin from 'fastify-plugin';

async function dbConnector (fastify, options) {
  fastify.register(require('fastify-mongodb'), {
    url: 'mongodb+srv://Jimbo:jimbobo@aled.uhpi1.mongodb.net/formationsDevWeb?retryWrites=true&w=majority'
  })
}

export default fastifyPlugin(dbConnector)