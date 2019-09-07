const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({

  firstName: {
      type: String,
      require: [true, "firstName is required field"],
      validate: /^[A-Za-z]+$/
  },
  lastName: {
      type: String,
      require: [true, "lastName is required field"],
      validate: /^[A-Za-z]+$/
  },
  email: {
      type: String,
      require: [true, "email is a required field"],
      unique: [true , "Email is a unique field"],
      validate: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  password: {
      type: String,
      require: [true, "password is a required field"]
  }
});

module.exports = mongoose.model("user",userSchema,"user");