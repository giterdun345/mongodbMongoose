const mongoose = require('mongoose');
require('dotenv').config();
require('mongoose')

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})

const PersonSchema = new mongoose.Schema({
  name:{type: String, required:true},
  age: Number,
  favoriteFoods: [String]
})

let Person = mongoose.model("Person", PersonSchema)

const createAndSavePerson = (done) => {
  const JohnK = new Person({
    name:'John',
    age:'38',
    favoriteFoods:'stuff'
  })
  JohnK.save((error, data) => {
    if(error) return done(error)
    done(null, data);
  })

};
var arrayOfPeople = [
  { name:'Jim',
    age:34, 
    favoriteFoods: ['more stuff']
  },
  { name:'Joe',
    age:43, 
    favoriteFoods: ['even more stuff']
  },
  { name:'Jane',
    age:24, 
    favoriteFoods: ['little stuff']
  }
]
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (error, data) => {
    if(error) return done(error)
    done(null, data)
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (error, data)=>{
    if(error) return done(error)
      done(null, data)
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (error, data)=>{
    if(error) return done(error)
    done(null, data)
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (error, data)=>{
  if(error) return done(error)
  done(null, data)
})
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';

  // .findById() method to find a person by _id with the parameter personId as search key. 
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
  
    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
