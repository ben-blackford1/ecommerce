import mongoose from "mongoose";

const connection = {};

async function connectToDatabase() {
  if (connection.isConnected) {
    console.log("Already Connected to DB...");
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("Use the Previous Connection to the Database");
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("New Connection to the Database...");
  connection.isConnected = db.connections[0].readyState;
}

async function disconnectFromDatabase() {
  if (connection.isConnected) {
    if (process.env.NODE_END === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log(
        "Currently in Development Mode, Remaining Connected to the Database..."
      );
    }
  }
}

const database = { connectToDatabase, disconnectFromDatabase };

export default database;
