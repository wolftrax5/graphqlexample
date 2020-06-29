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
    Query: {
        getCourses: () => {
            return courses
        },
        getCourse: (root, args) => {
            const course = courses.filter(course => course._id ===args.id) 
            return course.pop();
        }
    }
}