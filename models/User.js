//requiring mongodb users collection
const usersCollection = require('../db').collection('users');
//email "validator" check package 
const validator = require('validator');
// Step 1 - user properties
//setting up a constructor function to define our users 
let User = function (data) {
 
  this.data = data; /*this.pizza*/
  this.errors = [];
};
// Step 2 - User methods
// adding a method to our constructor function /more efficient bc we don't have to access methods unless a req is made.  The User will have access to them but not all users will need to have access to all the methods (ie - potential situations that may arise)



// cleanup function will revert the user data property(ies) back to zero if there aren't strings
User.prototype.cleanUp = function () {
  //typeof (a) or typeof a 
  if (typeof (this.data.username) != 'string') {
    this.data.username = '';
  }
  if (typeof this.data.email != 'string') {
    this.data.email = '';
  }
  if (typeof (this.data.password) != 'string') {
    this.data.password = '';
  }
  // get rid of any bogus properties by overwriting any possible additional keys or properties
  //trim() will get rid of empty spaces at the beginning or the end, toLowerCase() obvious 
  this.data = {
    username: this.data.username.trim().toLowerCase(),
    email: this.data.email.trim().toLowerCase(),
    password: this.data.password,
  };
};

//before we register the user , we have to validate the user 
User.prototype.validate = function () {
  if (this.data.username == '') {
    this.errors.push('You must provide a username');
  }
  //if they type something in and that thing they typed is validator.isAlphanumeric(a) (returns True or false)
  // here again we use != && !  - if both conditions are TRUE we then ! them to make them false and once again the if(true) won't run the code (won't push any errors)
  if (this.data.username != '' && !validator.isAlphanumeric(this.data.username)) {
    this.errors.push('Username can only contain letters and numbers');
  }
  if (this.data.username.length > 30) {
    this.errors.push('Username cannot exceed 30 characters.');
  }
  if (this.data.username.length > 0 && this.data.username.length < 3) {
    this.errors.push('Username must be at least 3 characters long');
  }

  //validator.isEmail(a)  returns True or False, once we know it is a valid email (TRUE) we don't need to push an item to the errors array so instead we use ! to do the opposite.  Now , if the user types in a valid email the if (!True) = False so nothing is pushed onto the errors array. 
  if (!validator.isEmail(this.data.email)) {
    this.errors.push('You must provide a valid email');
  }

  if (this.data.password == '') {
    this.errors.push('you must provide a password');
  }
  if (this.data.password.length > 0 && this.data.password.length < 10) {
    this.errors.push('Password must be at least 10 characters long');
  }
  if (this.data.password.length > 20) {
    this.errors.push('Password cannot exceed 20 characters.');
  }
};


User.prototype.login = function(callback){
this.cleanUp();
// does the user exist?  we ahve to check in our mongodb  usersCollection(a,b)
usersCollection.findOne({username: this.data.username}, (err, attemptedUser) => {  // arrow funtions do not manipualte the this keyword 
if (attemptedUser && attemptedUser.password == this.data.password){
callback('congrats')
}

else{
  callback ('invalid username / password')
}
})

}


User.prototype.register = function () {
  //step 1 - validate userdata  see User.prototype.cleanup and User.prototype.validate
  this.cleanUp();   // notice we cleanup the data before we send it over for validation
  this.validate();

  //step 2 - only if there are no validation errors then save userdata into a database
if (!this.errors.length){
usersCollection.insertOne(this.data)
}

};

module.exports = User;
