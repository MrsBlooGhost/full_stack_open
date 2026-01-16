// load the Mongoose library into this file and give access to its API via variable `mongoose`
const mongoose = require('mongoose');

// ignore unknown query fields since FSO doesn't want us to think about query validation yet
mongoose.set('strictQuery', false);

// connect to MongoDB
console.log('connecting to', process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI, { family: 4})
  .then(result => console.log('connected to MongoDB'))
  .catch(error => console.log('error connecting to MongoDB:', error.message));

// define the schema (fields and their types) of a Person document (row) in the collection
const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

// control how Person documents are converted to JSON
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

// create and export the Person model, which is used to query and modify Person documents in the database
module.exports = mongoose.model('Person', personSchema)
