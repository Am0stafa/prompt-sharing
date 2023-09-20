import mongoose from 'mongoose';

let isConnected = false; // track the connection

/**
 * Checks if the MongoDB is already connected and sets the isConnected flag accordingly.
 * Returns true if the MongoDB is already connected, false otherwise.
  To check if the MongoDB is connected, you can use the mongoose.connection.readyState property. This property returns the current state of the connection, which can be one of the following values:

  0: disconnected
  1: connected
  2: connecting
  3: disconnecting
 */
export const checkDBConnection = () => {
  const isConnected = mongoose.connection.readyState === 1;

  if (isConnected) {
    console.log('MongoDB is already connected');
  } else {
    console.log('MongoDB is not connected');
  }

  return isConnected;
};

/**
 * Connects to a MongoDB database using the Mongoose library.
 * If a connection is already established, it logs a message and returns.
 * If the connection is successful, it sets the isConnected variable to true and logs a success message.
 * If an error occurs during the connection, it logs the error.
 */
export const connectToDB = async () => {
  //! When strictQuery is set to true, Mongoose will throw an error if you try to query a field that is not defined in your schema. This can be helpful for catching typos or other mistakes in your code that might otherwise go unnoticed.
  mongoose.set('strictQuery', true);

  // isConnected = checkDBConnection();
  if(isConnected) 
    return;

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true;

    console.log('MongoDB connected')
  } catch (error) {
    console.log(error);
  }
}