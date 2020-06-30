'use strict'

const connectDB = require('./db');

module.exports = {
    createCourse: async (root, {input}) => {
        const defaults = {
            teacher: '',
            topic: ''
        }
        let db, course
        const newCourse = Object.assign(defaults, input);
        try{
            db = await connectDB(); 
           course = await db.collection('courses').insertOne(newCourse)
           newCourse._id = course.insertedId
        } catch(err) {
            console.error(err)
        }
        return newCourse;
    }
}
