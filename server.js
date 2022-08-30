'use strict';

require('dotenv').config();

const express = require('express');

const cors = require('cors');

const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

const app = express();

app.use(cors());
app.use(express.json());

const Book = require('./models/book')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('Mongoose is connected');
});

const PORT = process.env.PORT || 3002;

app.get('/test', (request, response) => {

  response.send('test request received')

})



app.get('/books', getBooks)
async function getBooks(request, response, next) {
  try {
    let results = await Book.find();
    response.status(200).send(results);
  } catch (error) {
    next(error);
  }
}



app.post('/books', postBook);

async function postBook(request, response, next) {
  console.log(request.body)
  try {
    const newBook = await Book.create(request.body);
    response.status(201).send(newBook);
  } catch (error) {
    next(error);
  }
}



app.delete('/books/:bookid', deleteBook);

async function deleteBook(request, response, next) {
  const id = request.params.bookid;
  console.log(id);
  try {
    await Book.findByIdAndDelete(id);
    response.status(204).send('Success!');
  } catch (error) {
    next(error)
  }
}



app.get('*', (request, response) => {
  response.status(404).send('Not Available');
});


app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
