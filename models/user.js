// model based on which the document of the user will be created  
import { Schema, model, models } from 'mongoose';

/**
 * Defines a Mongoose schema for a user.
 * 
 * @class
 * @name UserSchema
 * 
 * @property {String} email - The email of the user. Must be unique and required.
 * @property {String} username - The username of the user. Must be required, match a specific pattern, and be between 8 and 20 characters long.
 * @property {String} image - The image of the user.
 * 
 * @example
 */
const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"] 
  },
  image: {
    type: String,
  }
});

// we do it differently than an express server which is always running. by this, prevent the model from being overwritten each time the server is restarted so such that this prevent redefining the model and ensure the existing model is reused.
// look at the models (models.User) and see if the user is there only if its not there then create a new model
const User = models.User || model("User", UserSchema);

export default User;