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
  Person.findById(personId, (err, data) => {
    if(err) return console.log(err);   
    data.favoriteFoods.push(foodToAdd);
    data.save((err, updatedData) => {
      if(err) return console.log(err);
      done(null, updatedData)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName},{age:ageToSet}, {new:true}, (error, data)=>{
    if(error) return done(error)
    done(null, data)
  })
 
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personID, (error, data)=>{
    if(error) return done(error)
    done(null, data)
  })
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
