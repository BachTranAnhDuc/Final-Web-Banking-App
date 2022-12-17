import React, { useState } from 'react';
// import Button from '@mui/material/Button';
import { useGlobalContext } from '../context/appContext';

import { Toast } from '../components';

import { MuiOtpInput } from 'mui-one-time-password-input';

// import { styled } from 'styled-component';
import styled from 'styled-components';

import { Formik, Form, Field, ErrorMessage, useFormik, useField } from 'formik';
import * as yup from 'yup';

import ForgotPwdStyle from '../theme/pages/ForgotPwd';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import ButtonGroup from '@mui/material/ButtonGroup';

import {
  MUIInputCustom01,
  MUIInputCustom02,
  MUIInputCustom03,
  RedditTextField,
} from '../theme/components/Input';
import {
  MUIButtonCustom02,
  MUIButtonCustom03,
  MUIComplexButton,
} from '../theme/components/Buttons';
import { HeadingPrimary, DefaultParagraph } from '../theme/base/Typography';

import NewLoginStyled from '../theme/pages/NewLogin';

import { BsFacebook, BsMenuButton } from 'react-icons/bs';
import { AiFillInstagram, AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import SendIcon from '@mui/icons-material/Send';

import Countdown from 'react-countdown';

import CloseIcon from '@mui/icons-material/Close';

// import { LoadingButton } from '@mui/lab';

const initState = {
  phone: '',
  email: '',
  otp: '',
};

const initValidInput = {
  isValidPhone: false,
  isValidEmail: false,
};

const ForgotPassword = () => {
  const [values, setValues] = useState(initState);
  const [validValues, setValidValues] = useState(initValidInput);

  const {
    actionForgotPage,
    forgotPage,
    showToast,
    sendOtpForgotPwd,
    isLoadingForm,
    confirmOtpForgotPwd,
    forgotUserTemp,
    confirmPwdForgotPwd,
  } = useGlobalContext();

  const validateUsername = (value) => {
    let error;

    if (!value) {
      error = 'This is required';
    }
    // if (value.length !== 6) {
    //   error = 'Username must equal 6 characters';
    // }
    return error;
  };
  const validatePhone = (value) => {
    let error;

    if (!value) {
      error = 'This is required';
    }
    // if (value.length < 8) {
    //   error = 'Phone must at least 8 characters';
    // }
    return error;
  };
  const validateOTP = (value) => {
    let error;

    if (!value) {
      error = 'This is required';
    }
    if (value.length !== 6) {
      error = 'OTP must equal 6 characters';
    }
    return error;
  };

  const handleClickNext = (inputOk) => {
    actionForgotPage({
      numPage: forgotPage.numPage,
      isOK: inputOk,
      type: 'plus',
      length: 3,
    });
  };
  const handleClickBack = (inputOk) => {
    actionForgotPage({
      numPage: forgotPage.numPage,
      isOK: true,
      type: 'minus',
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

        <div className="forgot-right">
          <div className="forgot-right__content">
            <h2 className="forgot-right__content--logo">Logo</h2>

            <h2 className="forgot-right__content--heading">Password Reset</h2>

            <p className="forgot-right__content--text">
              To reset your password, enter the email address you use to sign in
              to iofrm
            </p>

            <Box
              sx={{
                display: 'grid',
                gridTemplateRows: '1fr max-content',
                gap: '1.2rem',
                backgroundColor: 'inherit',
              }}
            >
              <Formik
                initialValues={{
                  username: '',
                  phone: '',
                  otp: '',
                  pwd: '',
                  confirmPwd: '',
                }}
                // validationSchema={validationSchema}
                onSubmit={async (values, actions) => {
                  console.log(values);
                }}
              >
                {(props) => (
                  <>
                    <Form
                      onSubmit={props.handleSubmit}
                      className="forgot-right__form"
                    >
                      {forgotPage.numPage === 1 && (
                        <Box
                          sx={{
                            display: 'grid',
                            gridTemplateRows: 'repeat(2, max-content)',
                            rowGap: '1.2rem',
                          }}
                        >
                          <Field name="username" validate={validateUsername}>
                            {({ field, form, meta }) => (
                              <FormControl>
                                <RedditTextField
                                  variant="filled"
                                  // style={{ marginTop: 11 }}
                                  {...field}
                                  id="username"
                                  name="username"
                                  label="Email"
                                  value={props.values.username}
                                  onChange={props.handleChange}
                                  error={
                                    props.touched.username &&
                                    Boolean(props.errors.username)
                                  }
                                  aria-describedby="component-helper-text"
                                />
                                <FormHelperText
                                  id="component-helper-text"
                                  sx={{
                                    fontSize: '1.2rem',
                                    color: 'var(--color-tertiary-dark-2)',
                                  }}
                                >
                                  {props.touched.username &&
                                    props.errors.username}
                                </FormHelperText>
                              </FormControl>
                            )}
                          </Field>

                          <Field name="phone" validate={validatePhone}>
                            {({ field, form, meta }) => (
                              <FormControl>
                                <RedditTextField
                                  variant="filled"
                                  style={{ marginTop: 11 }}
                                  {...field}
                                  id="phone"
                                  name="phone"
                                  label="Phone"
                                  value={props.values.phone}
                                  onChange={props.handleChange}
                                  error={
                                    props.touched.phone &&
                                    Boolean(props.errors.phone)
                                  }
                                />
                                <FormHelperText
                                  id="component-helper-text"
                                  sx={{
                                    fontSize: '1.2rem',
                                    color: 'var(--color-tertiary-dark-2)',
                                  }}
                                >
                                  {props.touched.phone && props.errors.phone}
                                </FormHelperText>
                              </FormControl>
                            )}
                          </Field>
                        </Box>
                      )}

                      {forgotPage.numPage === 2 && (
                        <Box
                          sx={{
                            display: 'grid',
                            gridTemplateRows: 'repeat(2, max-content)',
                            rowGap: '0.8rem',
                            // backgroundColor: 'orange',
                            height: '100%',
                          }}
                        >
                          <Field name="otp" validate={validateOTP}>
                            {({ field, form, meta }) => (
                              <FormControl>
                                <RedditTextField
                                  variant="filled"
                                  style={{ marginTop: 11 }}
                                  {...field}
                                  id="otp"
                                  name="otp"
                                  label="OTP"
                                  value={props.values.otp}
                                  onChange={props.handleChange}
                                  error={
                                    props.touched.otp &&
                                    Boolean(props.errors.otp)
                                  }
                                  aria-describedby="component-helper-text"
                                />
                                <FormHelperText
                                  id="component-helper-text"
                                  sx={{
                                    fontSize: '1.2rem',
                                    color: 'var(--color-tertiary-dark-2)',
                                  }}
                                >
                                  {props.touched.otp && props.errors.otp}
                                </FormHelperText>
                              </FormControl>
                            )}
                          </Field>
                        </Box>
                      )}
                      {forgotPage.numPage === 3 && (
                        <Box
                          sx={{
                            display: 'grid',
                            gridTemplateRows: 'repeat(2, max-content)',
                            rowGap: '0.8rem',
                            // backgroundColor: 'blue',
                            height: '100%',
                          }}
                        >
                          <Field name="pwd">
                            {({ field, form, meta }) => (
                              <FormControl>
                                <RedditTextField
                                  variant="filled"
                                  style={{ marginTop: 11 }}
                                  {...field}
                                  id="pwd"
                                  name="pwd"
                                  label="New password"
                                  value={props.values.pwd}
                                  onChange={props.handleChange}
                                  error={
                                    props.touched.pwd &&
                                    Boolean(props.errors.pwd)
                                  }
                                  aria-describedby="component-helper-text"
                                />
                                <FormHelperText
                                  id="component-helper-text"
                                  sx={{
                                    fontSize: '1.2rem',
                                    color: 'var(--color-tertiary-dark-2)',
                                  }}
                                >
                                  {props.touched.pwd && props.errors.pwd}
                                </FormHelperText>
                              </FormControl>
                            )}
                          </Field>

                          <Field name="confirmPwd">
                            {({ field, form, meta }) => (
                              <FormControl>
                                <RedditTextField
                                  variant="filled"
                                  style={{ marginTop: 11 }}
                                  {...field}
                                  id="confirmPwd"
                                  name="confirmPwd"
                                  label="Confirm password"
                                  value={props.values.confirmPwd}
                                  onChange={props.handleChange}
                                  error={
                                    props.touched.confirmPwd &&
                                    Boolean(props.errors.confirmPwd)
                                  }
                                  aria-describedby="component-helper-text"
                                />
                                <FormHelperText
                                  id="component-helper-text"
                                  sx={{
                                    fontSize: '1.2rem',
                                    color: 'var(--color-tertiary-dark-2)',
                                  }}
                                >
                                  {props.touched.confirmPwd &&
                                    props.errors.confirmPwd}
                                </FormHelperText>
                              </FormControl>
                            )}
                          </Field>
                        </Box>
                      )}

                      <ButtonGroup
                        disableElevation
                        variant="contained"
                        aria-label="Disabled elevation buttons"
                        sx={{
                          justifySelf: 'end',
                          alignSelf: 'end',
                          gap: '1.2rem',
                        }}
                      >
                        {forgotPage?.numPage === 1 && (
                          <LoadingButton
                            variant="contained"
                            loading={isLoadingForm}
                            type="button"
                            onClick={() => {
                              showToast('Step 1', 3000, 'success');

                              // console.log(props.values.pwd);

                              sendOtpForgotPwd({
                                email: props.values.username,
                                phone: props.values.phone,
                              });
                            }}
                          >
                            Send OTP
                          </LoadingButton>
                        )}

                        {forgotPage?.numPage === 2 && (
                          <LoadingButton
                            variant="contained"
                            loading={isLoadingForm}
                            type="button"
                            onClick={() => {
                              showToast('Step 2 send otp');

                              confirmOtpForgotPwd({
                                email: forgotUserTemp?.email,
                                phone: forgotUserTemp?.phone,
                                otpForgotPass: props.values.otp,
                              });
                            }}
                          >
                            Send
                          </LoadingButton>
                        )}
                        {forgotPage?.numPage === 3 && (
                          <LoadingButton
                            variant="contained"
                            loading={isLoadingForm}
                            type="button"
                            onClick={() => {
                              showToast('Step 3 enter pwd');
                              confirmPwdForgotPwd({
                                email: forgotUserTemp?.email,
                                phone: forgotUserTemp?.phone,
                                password: props.values.pwd,
                                confirmPassword: props.values.confirmPwd,
                              });
                            }}
                          >
                            Reset
                          </LoadingButton>
                        )}
                        {/* <Button
                        type="button"
                        onClick={() => {
                          handleClickBack(true);
                        }}
                      >
                        Back
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          if (props.errors.username !== undefined) {
                            showToast(props.errors.username, 3000, 'error');
                            handleClickNext(
                              props.errors.username === undefined
                            );
                          } else if (props.errors.phone !== undefined) {
                            showToast(props.errors.phone, 3000, 'error');
                            handleClickNext(false);
                          } else {
                            handleClickNext(true);
                          }
                        }}
                      >
                        Next
                      </Button> */}
                      </ButtonGroup>
                    </Form>
                  </>
                )}
              </Formik>
            </Box>
          </div>
        </div>

        <Toast position={'top-center'}></Toast>
      </section>
    </ForgotPwdStyle>
  );
};

export default ForgotPassword;
