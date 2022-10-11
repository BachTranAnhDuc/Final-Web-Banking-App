import React, { useState, useEffect } from 'react';
import { Loading, CountDown, Toast } from '../components';
import { useGlobalContext } from '../context/appContext';
import loginImage from '../assets/images/login_1.svg';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

import ReactDOM from 'react-dom';
import { Formik, Form, Field, ErrorMessage, useFormik, useField } from 'formik';
import * as yup from 'yup';

import LoginStyled from '../theme/pages/Login';
import {
  DefaultButton,
  LoginButton,
  Button83,
  ContactButton,
  DownloadButton,
  MUIButtonLoading01,
} from '../theme/components/Buttons';

import styled from 'styled-components';

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

import { MUIInputCustom01, MUIInputCustom02 } from '../theme/components/Input';
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

const defaultState = {
  username: '',
  password: '',
  showPassword: true,
};

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

// let validationUsername = yup.mixed();

// validationUsername.validate({ name: 'jimmy', age: 24 }).then(function (value) {
//   value; // => { name: 'jimmy',age: 24 }
// });

const validationSchema = yup.object({
  username: yup.string('Enter your username').required('Username is required'),
  password: yup.string('Enter your pwd').required('Password is required'),
});

const validateUsername = (value) => {
  let error;
  if (value.length === 0) {
    error = 'This is required!';

    return error;
  }
  if (value.length < 3) {
    error = 'Min length is 3 characters';
    return error;
  }
  if (value.length > 12) {
    error = 'Max length is 6 characters';
    return error;
  }

  return error;
};

// Random component
const Completionist = () => <span>You can login now!</span>;

// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <span>
        You can login after {hours}:{minutes}:{seconds}
      </span>
    );
  }
};

const NewLogin = () => {
  const {
    isLoading,
    switchPage,
    isErrorForm,
    messageErrorForm,
    typeErrorForm,
    login,
    isLogin,
    isLoadingForm,
    isCountDown,
    isAlert,
    numberOfLoginFail,
    styleInputLogin,
    resetLoginForm,
    user,
    showToast,
  } = useGlobalContext();

  const navigate = useNavigate();

  const [values, setValues] = useState(defaultState);

  const [closeAlertLogin, setCloseAlertLogin] = useState(false);

  // const onSubmit = (e) => {
  //   console.log(e);
  // };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loginSuccess = () => {
    navigate('/dashboard');
  };

  const handleSwitchPage = (inputPath) => {
    switchPage();
    navigate(inputPath);
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },

    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      login(
        {
          username: values.username,
          password: values.password,
        },
        actions,
        loginSuccess
      );
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <NewLoginStyled>
      <section className="section__new-login">
        <div className="new-login">
          <div className="new-login__left">
            <HeadingPrimary inputColor="var(--color-white)" inputSize="2.8rem">
              Welcome to login
            </HeadingPrimary>
            <DefaultParagraph inputColor="var(--color-white)">
              Don't have account
            </DefaultParagraph>
            <MUIButtonCustom03
              onClick={() => handleSwitchPage('/new-register')}
            >
              Register
            </MUIButtonCustom03>
          </div>
          <div className="new-login__right">
            <div className="new-login__right--header">
              <HeadingPrimary
                inputColor="var(--color-primary-dark-5)"
                inputSize="2.4rem"
              >
                LOGIN
              </HeadingPrimary>
              <div className="new-login__right--header-icons">
                <div className="new-login__icon-container">
                  <AiFillInstagram className="new-login__icon"></AiFillInstagram>
                </div>
                <div className="new-login__icon-container">
                  <BsFacebook className="new-login__icon"></BsFacebook>
                </div>
              </div>
            </div>

            <div className="new-login__right--body">
              {/* <form className="new-login__form" onSubmit={formik.handleSubmit}>
                <MyTextField
                  id="username"
                  name="username"
                  label="Username"
                  // value={props.values.username}
                  // onChange={props.handleChange}
                  // error={
                  //   props.touched.username && Boolean(props.errors.username)
                  // }
                  // aria-describedby="component-helper-text"
                  // disabled={isCountDown}
                />
              </form> */}
              <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={async (values, actions) => {
                  login(
                    {
                      username: values.username,
                      password: values.password,
                    },
                    actions,
                    loginSuccess
                  );
                }}
              >
                {(props) => (
                  <Form
                    onSubmit={props.handleSubmit}
                    className="new-login__form"
                  >
                    <div className="new-login__form--alert-container">
                      {numberOfLoginFail === 3 && isCountDown && (
                        <Alert
                          severity="error"
                          sx={{ fontSize: '1.4rem' }}
                          action={
                            <Button color="inherit" size="small">
                              UNDO
                            </Button>
                          }
                        >
                          <AlertTitle sx={{ fontSize: '1.4rem' }}>
                            Error
                          </AlertTitle>

                          <Countdown
                            date={Date.now() + 5000}
                            renderer={renderer}
                          />
                        </Alert>
                      )}
                      {numberOfLoginFail === 6 && (
                        <Alert
                          severity="error"
                          sx={{ fontSize: '1.4rem' }}
                          action={
                            <IconButton
                              aria-label="close"
                              color="inherit"
                              size="small"
                              onClick={() => {
                                setCloseAlertLogin(false);
                              }}
                            >
                              <CloseIcon fontSize="inherit" />
                            </IconButton>
                          }
                        >
                          <AlertTitle sx={{ fontSize: '1.4rem' }}>
                            Error
                          </AlertTitle>
                          Your account is blocked <strong>forever</strong>
                        </Alert>
                      )}
                    </div>
                    <Field name="username">
                      {({ field, form, meta }) => (
                        <FormControl>
                          <MUIInputCustom02
                            {...field}
                            id="username"
                            name="username"
                            label="Username"
                            value={props.values.username}
                            onChange={props.handleChange}
                            error={
                              props.touched.username &&
                              Boolean(props.errors.username)
                            }
                            aria-describedby="component-helper-text"
                            disabled={isCountDown}
                            // helperText={
                            //   props.touched.username && props.errors.username
                            // }
                          />
                          <FormHelperText
                            id="component-helper-text"
                            sx={{
                              fontSize: '1.2rem',
                              color: 'var(--color-tertiary-dark-2)',
                            }}
                          >
                            {props.touched.username && props.errors.username}
                          </FormHelperText>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="password">
                      {({ field, form, meta }) => (
                        <FormControl>
                          <MUIInputCustom02
                            id="password"
                            name="password"
                            label="Password"
                            value={props.values.password}
                            onChange={props.handleChange}
                            error={
                              props.touched.password &&
                              Boolean(props.errors.password)
                            }
                            disabled={isCountDown}
                            // helperText={
                            //   props.touched.password && props.errors.password
                            // }
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                  >
                                    {values.showPassword ? (
                                      <AiFillEyeInvisible />
                                    ) : (
                                      <AiFillEye />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                          <FormHelperText
                            id="component-helper-text"
                            sx={{
                              fontSize: '1.2rem',
                              color: 'var(--color-tertiary-dark-2)',
                            }}
                          >
                            {props.touched.password && props.errors.password}
                          </FormHelperText>
                        </FormControl>
                      )}
                    </Field>

                    {isLoadingForm ? (
                      <MUIButtonLoading01
                        endIcon={<SendIcon />}
                        loading={isLoadingForm}
                        loadingPosition="end"
                        variant="contained"
                      >
                        Login is processing...
                      </MUIButtonLoading01>
                    ) : (
                      <MUIButtonCustom02
                        variant="contained"
                        type="submit"
                        disabled={isCountDown}
                      >
                        Login
                      </MUIButtonCustom02>
                    )}

                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: 'max-content 1fr',
                        alignItems: 'center',
                      }}
                    >
                      <FormControl component="fieldset">
                        <FormGroup aria-label="position" row>
                          <FormControlLabel
                            value="remember"
                            control={
                              <Checkbox
                                {...label}
                                defaultChecked
                                sx={{
                                  color: 'var(--color-primary-light-2)',

                                  '&.Mui-checked': {
                                    color: 'var(--color-primary)',
                                  },
                                }}
                              />
                            }
                            label="Remember me"
                            labelPlacement="start"
                          />
                        </FormGroup>
                      </FormControl>

                      <Box sx={{ justifySelf: 'end' }}>
                        <InputLabel>Forgot password</InputLabel>
                      </Box>
                    </Box>
                  </Form>
                )}
              </Formik>
              {/* <form onSubmit={formik.handleSubmit} className="new-login__form">
                <FormControl>
                  <MUIInputCustom02
                    id="username"
                    name="username"
                    label="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    // validate={validateUsername}
                    error={
                      formik.touched.username && Boolean(formik.errors.username)
                    }
                    helperText={
                      formik.touched.username && formik.errors.username
                    }
                  />

                </FormControl>
                <FormControl>
                  <MUIInputCustom02
                    id="password"
                    name="password"
                    label="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <AiFillEyeInvisible />
                            ) : (
                              <AiFillEye />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
                <MUIButtonCustom02
                  variant="contained"
                  type="submit"
                  // onClick={onSubmit}
                >
                  Login
                </MUIButtonCustom02>

                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'max-content 1fr',
                    alignItems: 'center',
                  }}
                >
                  <FormControl component="fieldset">
                    <FormGroup aria-label="position" row>
                      <FormControlLabel
                        value="remember"
                        control={
                          <Checkbox
                            {...label}
                            defaultChecked
                            sx={{
                              color: 'var(--color-primary-light-2)',

                              '&.Mui-checked': {
                                color: 'var(--color-primary)',
                              },
                            }}
                          />
                        }
                        label="Remember me"
                        labelPlacement="start"
                      />
                    </FormGroup>
                  </FormControl>

                  <Box sx={{ justifySelf: 'end' }}>
                    <InputLabel>Forgot password</InputLabel>
                  </Box>
                </Box>
              </form> */}
            </div>
          </div>
        </div>

        <Toast position={'top-right'}></Toast>
      </section>
    </NewLoginStyled>
  );
};

export default NewLogin;
