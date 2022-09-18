import 'express-async-errors';

import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

import express, { application } from 'express';
const app = express();

// connect to db
import connectDB from './db/connect.js';

// import routes
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';

// cookies

// morgan
import morgan from 'morgan';

if (process.env.NODE_ENV === 'dev') app.use(morgan('dev'));

app.use(cors());
app.use(express.json());

// routes
app.use('/api/v1/auth', authRouter);

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(`Something went wrong! ${error}`);
  }
};

start();
