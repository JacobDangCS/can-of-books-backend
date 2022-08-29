'use strict';

require('dotenv').config();

const express = require('express');

const cors = require('cors');

const mongoose = require('mongoose');

const app = express();

app.use(cors());

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('Mongoose is connected');
});

const PORT = process.env.PORT || 3011;

app.get('/test', (request, response) => {

  response.send('test request received')

})


// app.get('/', (request response) => {

//   response.status(200).send('Welcome!')

//  });


app.get('*', (request, response) => {
  response.status(404).send('Not Available');
});


app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});



app.get('/books', getBooks => {
  async function getBooks(request, response, next) {
    try {
      let results = await Book.find();
      response.status(200).send(results);
    } catch (error) {
      next(error);
    }
  }
});


app.listen(PORT, () => console.log(`listening on ${PORT}`));
