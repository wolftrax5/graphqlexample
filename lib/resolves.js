'use strict'
const mutations = require('./mutations')
const querys =  require('./querys')
const types = require('./types')

module.exports = {
    Query: querys,
    Mutation: mutations,
   ...types
}