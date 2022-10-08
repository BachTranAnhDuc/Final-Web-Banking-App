import React, { useState } from 'react';
import TextField from '@mui/joy/TextField';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import Box from '@mui/joy/Sheet';
import Button from '@mui/joy/Button';
// import Button from '@mui/material/Button';
import { useGlobalContext } from '../context/appContext';

import { Toast } from '../components';

import { MuiOtpInput } from 'mui-one-time-password-input';

// import { styled } from 'styled-component';
import styled from 'styled-components';

import ForgotPwdStyle from '../theme/pages/ForgotPwd';

const initState = {
  phone: '',
  email: '',
  otp: '',
};

const initValidInput = {
  isValidPhone: false,
  isValidEmail: false,
};

const MuiOtpInputStyled = styled(MuiOtpInput)`
  display: flex;
  gap: 30px;
  max-width: 650px;
  margin-inline: auto;
  /* background-color: var(--color-fourth); */
`;

const ForgotPassword = () => {
  const [values, setValues] = useState(initState);
  const [validValues, setValidValues] = useState(initValidInput);

  const { actionForgotPage, forgotPage, showToast } = useGlobalContext();

  const handleChangeOTP = (newValue) => {
    setValues({ ...values, otp: newValue });
  };

  const checkValidInput = () => {
    if (values.email === 'anhduc@gmail.com' && values.phone === '123456789') {
      // showToast('Valid phone and email', 2000, 'success');
      setValidValues({ isValidEmail: true, isValidPhone: true });

      return true;
    } else {
      // showToast('Not valid phone or email', 2000, 'error');
      setValidValues({ isValidEmail: false, isValidPhone: false });

      return false;
    }
  };

  const handleChangeInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleClickNext = (e) => {
    actionForgotPage({
      numPage: 1,
      isOK: checkValidInput(),
      type: 'plus',
      length: 3,
    });
  };

  return (
    <ForgotPwdStyle>
      <section className="section-forgot">
        <div className="forgot-left">
          <div className="forgot-left__content">
            <h2 className="forgot-left__content--heading">
              Get more things done with Loggin platform.
            </h2>
            <p className="forgot-left__content--text">
              Access to the most powerfull tool in the entire design and web
              industry.
            </p>

            <img
              src="https://brandio.io/envato/iofrm/html/images/graphic4.svg"
              alt=""
              className="forgot-left__content--img"
            />
          </div>
        </div>
        {forgotPage.numPage === 1 && (
          <div className="forgot-right">
            <div className="forgot-right__content">
              <h2 className="forgot-right__content--logo">Logo</h2>

              <h2 className="forgot-right__content--heading">Password Reset</h2>

              <p className="forgot-right__content--text">
                To reset your password, enter the email address you use to sign
                in to iofrm
              </p>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateRows: 'repeat(2, min-content)',
                  gap: '1.2rem',
                  backgroundColor: 'inherit',
                }}
              >
                <FormControl>
                  <Input
                    placeholder="Phone"
                    // color="#fff"
                    color="common.white"
                    variant="solid"
                    sx={{
                      // backgroundColor: '#fff',
                      height: '4rem',
                      paddingRight: '0.4rem',
                    }}
                    size="lg"
                    name="phone"
                    value={values.phone}
                    onChange={handleChangeInput}
                    disabled={
                      validValues.isValidEmail && validValues.isValidPhone
                        ? true
                        : false
                    }
                  />
                </FormControl>
                <FormControl>
                  <Input
                    placeholder="Email"
                    color="#fff"
                    variant="solid"
                    sx={{
                      backgroundColor: '#fff',
                      height: '4rem',
                      paddingRight: '0.4rem',
                    }}
                    size="lg"
                    name="email"
                    value={values.email}
                    onChange={handleChangeInput}
                    disabled={
                      validValues.isValidEmail && validValues.isValidPhone
                        ? true
                        : false
                    }
                  />
                </FormControl>

                <Button
                  size="lg"
                  variant="solid"
                  sx={{
                    backgroundColor: '#fff',
                    justifySelf: 'end',
                    letterSpacing: '0.1rem',
                    color: '#44C97D',
                  }}
                  onClick={handleClickNext}
                >
                  {validValues.isValidEmail && validValues.isValidPhone
                    ? 'Next'
                    : 'Send'}
                </Button>
              </Box>
            </div>
          </div>
        )}

        {forgotPage.numPage === 2 && (
          <div className="forgot-right">
            <div className="forgot-left__content--page2">
              <div className="forgot-left__content--heading">OTP</div>

              <MuiOtpInputStyled
                value={values.otp}
                onChange={handleChangeOTP}
                length={6}
              />

              <Button
                size="lg"
                variant="solid"
                sx={{
                  backgroundColor: '#fff',
                  justifySelf: 'end',
                  letterSpacing: '0.1rem',
                  color: '#44C97D',
                }}
                onClick={handleClickNext}
              >
                {validValues.isValidEmail && validValues.isValidPhone
                  ? 'Next'
                  : 'Send'}
              </Button>
            </div>
          </div>
        )}

        <Toast position={'top-center'}></Toast>
      </section>
    </ForgotPwdStyle>
  );
};

export default ForgotPassword;
