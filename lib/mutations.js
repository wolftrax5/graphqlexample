'use strict'

const connectDB = require('./db');
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')

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
            errorHandler(err, 'Create Course')
        }
        return newCourse;
    },
    editCourse: async (root, {id, input}) => {
        let db, course
        try{
            db = await connectDB(); 
            await db.collection('courses').updateOne(
               {_id: ObjectID(id)},
               {$set: input}
               )
            course = await db.collection('courses').findOne({_id: ObjectID(id)})
        } catch(err) {
            errorHandler(err, 'Edit Course')
        }
        return course;
    },
    deleteCourse: async (root, { id }) => {
        let db
        try{
            db = await connectDB(); 
            await db.collection('courses').deleteOne({_id: ObjectID(id)})
        } catch(err) {
            errorHandler(err, 'Delete Course')
        }
        return `Courses ${id} deleted`;
    },
    createPerson: async (root, {input}) => {
        let db, student
       
        try{
            db = await connectDB(); 
            student = await db.collection('students').insertOne(input)
            input._id = student.insertedId
        } catch(err) {
            errorHandler(err, 'Create Student')
        }
        return input;
    },
    editPerson: async (root, {id, input}) => {
        let db, student
        try{
            db = await connectDB(); 
            await db.collection('students').updateOne(
               {_id: ObjectID(id)},
               {$set: input}
               )
               student = await db.collection('students').findOne({_id: ObjectID(id)})
        } catch(err) {
            errorHandler(err, 'Edit Student')
        }
        return student;
    },
    deletePerson: async (root, { id }) => {
        let db
        try{
            db = await connectDB(); 
            await db.collection('students').deleteOne({_id: ObjectID(id)})
        } catch(err) {
            errorHandler(err, 'Delete Student')
        }
        return `Student ${id} deleted`;
    },
    addPeople: async(root, {courseId, personId}) => {
        let db
        let course, person
        try {
            db = await connectDB()
            // obtenemos los datos necesarios
            course = await db.collection('courses').findOne({
                _id: ObjectID(courseId)
            })
            person = await db.collection('students').findOne({
                _id: ObjectID(personId)
            })
            // validamos que los objetos existand en la BD
            if (!course || !person) throw new Error('La Persona o el Curso no existe')
            // hacemos la relacion
            await db.collection('courses').updateOne(
                {_id: ObjectID(courseId)},
                {$addToSet: {people: ObjectID(personId)}}
                )

        } catch(err) {
            errorHandler(err, 'Add People')
        }
        return course
    }
}
