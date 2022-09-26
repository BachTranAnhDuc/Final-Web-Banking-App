import 'express-async-errors';
import rateLimiter from 'express-rate-limit';

import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

import express, { application } from 'express';
const app = express();

import fileUpload from 'express-fileupload';

// upload image
import cloudinary from 'cloudinary';
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// connect to db
import connectDB from './db/connect.js';

// import routes
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';

// error
import errorHandler from './middleware/error-handle.js';
import notFound from './middleware/not-found.js';

// cookies

// morgan
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

// if (process.env.NODE_ENV === 'dev') app.use(morgan('dev'));

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);

app.use(fileUpload({ useTempFiles: true }));
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(cookieParser(process.env.JWT_SECRET));

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);

app.use(notFound);
app.use(errorHandler);

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
