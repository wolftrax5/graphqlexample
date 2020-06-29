'use strict'

const {buildSchema} = require('graphql')
const express = require('express')
const gdlMiddleware = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')
// configura los resolvers
const resolvers = require('./lib/resolves')

const app = express()
const port = process.env.port || 3008

// definiendo el squema
const schema =  buildSchema(
    readFileSync(
        join(__dirname, 'lib', 'schema.graphql'),
        'utf-8')
    )

app.use('/api', gdlMiddleware({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}))

app.listen(port, () => {
    console.log(`Server is listenign at http://localhost:${port}/api`);
})

