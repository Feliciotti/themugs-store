import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_DB_URI)
    .then(() => console.log('Users database connected'))
    .catch(err => console.log(err))