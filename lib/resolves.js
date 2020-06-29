'use strict'
const courses = [
    {
    _id: '412312',
    title: 'Node JS',
    teacher: 'Alejandro Medina',
    descrition: 'Basicos de Node',
    topic: 'JS',
    },
    {
        _id: '124512',
        title: 'React JS',
        teacher: 'Alejandro Medina',
        descrition: 'Basicos de React',
        topic: 'JS',
    }
]
module.exports = {
   getCourses: () => {
       return courses
   }
}