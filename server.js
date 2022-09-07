import 'express-async-errors';

import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();

// cookies

// routes

// morgan
import morgan from 'morgan';

if (process.env.NODE_ENV === 'dev') app.use(morgan('dev'));

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port`);
    });
  } catch (error) {
    console.log(`Something went wrong! ${error}`);
  }
};

start();
