// this file is focused on HTTP and Express

require('dotenv').config()

const express = require('express');
const morgan = require('morgan');
// importing the model guarantees the DB connection exists
const Person = require('./models/person')

const unknownEndpoint = (request, response, next) => {
  response
    .status(404)
    .send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error);

  if (error.name === "CastError") {
    return response.status(400).send({ error: 'malformatted ID' });
  } else {
    next(error);
  }
}

const app = express();
const PORT = process.env.PORT || 3001;

morgan.token('post', function getPostBody(request) {
  if (request.method === 'POST') {
    return JSON.stringify(request.body);
  } else {
    return '';
  }
});

app.use(express.static('dist'));
app.use(express.json());
app.use(morgan(':method :url :status :response-time ms :post'));

app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people);
  })
});

app.get('/api/persons/:id', (request, response, next) => {
  Person
    .findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person);
      } else {
        return response.status(404).end();
      }

    })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
  const now = new Date();
  Person
    .find({})
    .then(persons => {
        response.send(`
          <p>Phonebook has info for ${persons.length} people</p>
          <p>${now}</p>
        `)})
    .catch(error => next(error));
});

app.post('/api/persons', (request, response) => {
  const body = request.body;
  const name = body.name;
  const number = body.number;

  if (!name) {
    return response
      .status(400)
      .json({ error: 'name is missing'});
  }

  if (!number) {
    return response
      .status(400)
      .json({ error: 'number is missing'});
  }

  const person = new Person({ name, number });

  person.save().then(savedPerson => response.json(savedPerson));
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body;

  Person
    .findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end();
      }

      person.name = name;
      person.number = number;

      person
        .save()
        .then(updatedPerson => {
          response.json(updatedPerson)
        })
    })
    .catch(error => next(error))
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person
    .findByIdAndDelete(request.params.id)
    .then(person => response.status(204).end())
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler);

app.listen(PORT);
console.log(`Server running on port ${PORT}`);