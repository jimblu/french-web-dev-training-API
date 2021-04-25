import {Collection, ObjectId} from 'mongodb';
import createError from 'http-errors';
import { create } from 'node:domain';

const postSchema = {
    body: {
        type: 'object',
        properties: {
            organisation: {type: 'string'},
            name: {type: 'string'},
            price: {type: 'integer'},
            duration: {type: 'integer'},
            description: {type: 'string', minLength: 100},
            tags: {
                type: 'array',
                uniqueItems: true,
                items: {
                    type: 'string',
                    enum: [
                        'frontend',
                        'backend',
                        'fullstack',
                        'mobile',
                        'data science',
                    ],
                },
            },
        },
        required: ['organization', 'name', 'price', 'duration', 'description', 'tags'],
        additionalProperties: false
    }
}

export default async (fastify, options) => {
    //GET by id
    fastify.get('/formations/:id', async (req, reply) => {
        const result = await collection.findOne({ _id: new ObjectId(req.params.id)});
        if (!result) {
            return new createError.NotFound('Provided ID does not exists')
        }
        return result
    })
    //GET all
    const collection: Collection = fastify.mongo.db.collection('formations');
    fastify.get('/formations', async (req, reply) => {
        const result = await collection.find().toArray();
        if (!result.length) {
            return new createError.NotFound('Not Found')
        }
        return result
    })

    //POST one
    fastify.post('/formations', {schema: postSchema}, async (req, reply) => {
        const result = await collection.insertOne(req.body);
        return result.ops[0] //equivalent à reply.send(result)
    })

    //DELETE by id
    fastify.delete('/formations/:id', async (req, reply) => {
        const result = await collection.findOneAndDelete({
            _id: new ObjectId(req.params.id)
        })
        if (!result.value) {
            return new createError.NotFound('Provided ID does not exists')
        }
        return result
    })

    // fastify.put('formation/:id' async (req, reply) => {
    //     const result = await collection.findOneAndUpdate()
    // })
}