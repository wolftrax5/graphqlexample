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
            errorHandler(error, 'Get Courses')
        }
        return courses;
    },
    getCourse: async (root, { id }) => {
        let db, course;
        try {
            db = await connectDB()
            course = await db.collection('courses').findOne({_id: ObjectID(id)})
        } catch (error) {
            errorHandler(error, 'Get Course')
        }
        return course;
    },
    getPersons: async () => {
        let db, courses = [];
        try {
            db = await connectDB()
            courses = await db.collection('students').find().toArray()
        } catch (error) {
            errorHandler(error, 'Get Students')
        }
        return courses;
    },
    getPerson: async (root, { id }) => {
        let db, people;
        try {
            db = await connectDB()
            people = await db.collection('students').findOne({_id: ObjectID(id)})
        } catch (error) {
            errorHandler(error, 'Get Student')
        }
        return people;
    },
    searchItems: async(root, {keyword}) => {
        let db, items, people, courses;
        try {
            db = await connectDB()
            courses = await db.collection('courses').find(
                {$text: {$search: keyword}}
            ).toArray()
            people = await db.collection('students').find(
                {$text: {$search: keyword}}
            ).toArray()
            items = [...courses, ...people]
        } catch (error) {
            errorHandler(error, 'Get Searching')
        }
        return items;
    }
}