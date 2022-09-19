import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import uniqueRandom from 'unique-random';

const UserSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: [true, 'Please provide your phone number'],
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide your email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide valid email',
    },
  },
  name: {
    type: String,
    required: [true, 'Please provide your full name'],
    minLength: [6, 'Name must at least 6 characters'],
    maxLength: [75, 'Name must not more than 75 characters'],
  },
  birth: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  imageFront: {
    type: String,
    default: 'This is link front',
  },
  imageBack: {
    type: String,
    default: 'This is link back',
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    emum: ['admin', 'user'],
    default: 'user',
  },
  isFirstLogin: {
    type: Boolean,
    default: true,
  },
  verificationToken: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifiedDate: {
    type: Date,
  },
});

// UserSchema.pre('save', function () {
//   const randomUsername = uniqueRandom(100000000, 999999999);
//   const randomPassword = uniqueRandom(100000, 999999);

//   console.log(String(randomUsername()));

//   this.username = String(randomUsername());
//   this.password = String(randomPassword());
// });

export default mongoose.model('User', UserSchema);
