'use strict'

require('dotenv').config()
const {makeExecutableSchema} = require('graphql-tools')
const express = require('express')
const gdlMiddleware = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')
const cors = require('cors')
// configura los resolvers
const resolvers = require('./lib/resolves')

const app = express()
const port = process.env.port || 3008
const isDev = process.env.NODE_ENV !== 'production'
// definiendo el squema
const typeDefs =  readFileSync(
    join(__dirname, 'lib', 'schema.graphql'),
    'utf-8');

const schema =  makeExecutableSchema({typeDefs, resolvers});

app.use(cors())

app.use('/api', gdlMiddleware({
    schema: schema,
    rootValue: resolvers,
    graphiql: isDev
}))

app.listen(port, () => {
    console.log(`Server is listenign at http://localhost:${port}/api`);
})

