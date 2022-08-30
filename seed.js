'use strict';

const { default: mongoose } = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.DB_URL);

const Book = require('./models/book.js')

async function seed() {

    await Book.create({
        title: 'Book 1',
        description: 'description 1',
        status: 'Unread'
    })
    console.log('Book 1 was added')

    await Book.create({
        title: 'Book 2',
        description: 'description 2',
        status: 'Unread'
    })
    console.log('Book 2 was added')

    await Book.create({
        title: 'Book 3',
        description: 'description 3',
        status: 'Unread'
    })
    console.log('Book 3 was added')


    mongoose.disconnect();
}

seed();