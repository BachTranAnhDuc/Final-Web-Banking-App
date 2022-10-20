import sendVerificationEmail from './sendVerificationEmail.js';
import sendOTPForgotPass from './sendOTPForgotPass.js';
import sendOTP from './sendOTP.js'
import { createJWT, isTokenValid, attachCookiesToResponse } from './jwt.js';

export {
  sendVerificationEmail,
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  sendOTPForgotPass,
  sendOTP,
};
