'use strict'

function errorHandler(error, op = '') {
    console.error(error)
    throw new Error(`Fallo en la operacion ${op} del servidor`)
}