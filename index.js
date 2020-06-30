'use strict'

require('dotenv').config()
const {makeExecutableSchema} = require('graphql-tools')
const express = require('express')
const gdlMiddleware = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')
// configura los resolvers
const resolvers = require('./lib/resolves')

const app = express()
const port = process.env.port || 3008

// definiendo el squema
const typeDefs =  readFileSync(
    join(__dirname, 'lib', 'schema.graphql'),
    'utf-8');

const schema =  makeExecutableSchema({typeDefs, resolvers});
app.use('/api', gdlMiddleware({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}))

app.listen(port, () => {
    console.log(`Server is listenign at http://localhost:${port}/api`);
})

