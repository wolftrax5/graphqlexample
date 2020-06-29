'use strict'

const {graphql, buildSchema} = require('graphql')

// definiendo el squema

const schema =  buildSchema(`
    type Query {
        hello : String
        saludo: String
    }
`)
// configura los resolvers
const resolvers = {
    hello: () => {
        return 'Hello World'
    },
    saludo: () => {
        return 'Saludos a todos'
    }
}
// ejecutando el query hello
graphql(schema, '{saludo}', resolvers)
    .then(data => {
        console.table(data);
    }).catch(err => console.error(err) )
