import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const db = mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((err) => {
    console.log('Error Connecting To Database', err);
  });

// mongoose.set('useFindAndModify', false);
export default db;
