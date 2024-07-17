import mongoose from 'mongoose';


const dbconnection = async function  dataBaseConnection() {
    const params = {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    };
    try {
      mongoose.set("strictQuery", true);
     await mongoose.connect(process.env.DB_URL, params);
      console.log("MongoDB connected successfully");
    } catch (error) {
      console.log("MongoDB Connection Failed", error);
    }
  }

  export {dbconnection}