'use strict'

const connectDB = require('./db');
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')

module.exports = {
    getCourses: async () => {
        let db, courses = [];
        try {
            db = await connectDB()
            courses = await db.collection('courses').find().toArray()
        } catch (error) {
            errorHandler(err, 'Get Courses')
        }
        return courses;
    },
    getCourse: async (root, { id }) => {
        let db, course;
        try {
            db = await connectDB()
            course = await db.collection('courses').findOne({_id: ObjectID(id)})
        } catch (error) {
            errorHandler(err, 'Get Course')
        }
        return course;
    },
    getPersons: async () => {
        let db, courses = [];
        try {
            db = await connectDB()
            courses = await db.collection('students').find().toArray()
        } catch (error) {
            errorHandler(err, 'Get Students')
        }
        return courses;
    },
    getPerson: async (root, { id }) => {
        let db, course;
        try {
            db = await connectDB()
            course = await db.collection('students').findOne({_id: ObjectID(id)})
        } catch (error) {
            errorHandler(err, 'Get Student')
        }
        return course;
    }
}