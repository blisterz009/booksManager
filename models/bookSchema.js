const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
        title : {
            type : String
        },
        author : {
            type : String
        },
        summary : {
            type : String
        },
        genre : {
            type : String,
            enum : ['Horror', 'Thriller', 'Romantic', 'Comedy', 'Documentary', 'Autobiography', 'Inspirational'],
        },
        ageGroup : {
            type : String,
            enum : ['Children', 'Adult', 'All-ages'],
        }
    },
    {
        timestamps: true
    }
)
module.exports = books = mongoose.model('books', bookSchema)