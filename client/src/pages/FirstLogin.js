import React, { useState, useEffect } from 'react';
import { Loading, Toast } from '../components';
import { useGlobalContext } from '../context/appContext';
import loginImage from '../assets/images/login_1.svg';
import { Link, useNavigate } from 'react-router-dom';

import logoBank from '../assets/images/logo.svg';

import FirstLoginStyled from '../theme/pages/FirstLogin';

import {
  DefaultButton,
  LoginButton,
  Button83,
  ContactButton,
  DownloadButton,
  MUIButtonLoading01,
  MUIButtonCustom02,
  MUIButtonCustom03,
  MUIComplexButton,
} from '../theme/components/Buttons';
import { Formik, Form, Field, ErrorMessage, useFormik, useField } from 'formik';
import * as yup from 'yup';

import { HeadingPrimary, DefaultParagraph } from '../theme/base/Typography';

import NewLoginStyled from '../theme/pages/NewLogin';

import { BsFacebook, BsMenuButton } from 'react-icons/bs';
import { AiFillInstagram, AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import SendIcon from '@mui/icons-material/Send';
import { MUIInputCustom01, MUIInputCustom02 } from '../theme/components/Input';

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

const validationSchema = yup.object({
  password: yup.string('Enter your password').required('Password is required'),
  newpassword: yup
    .string('Enter your password')
    .required('Password is required'),
});

const defaultState = {
  pwd: '',
  pwdConfirm: '',
};

const FirstLogin = () => {
  const {
    isFirstLogin,
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
    firstLogin,
  } = useGlobalContext();
  const navigate = useNavigate();

  const [values, setValues] = useState(defaultState);

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

  // const [values, setValues] = useState(defaultState);

  // const [getErrValue, setErrValue] = useState({});
  // const [isAlert, setAlert] = useState(false);
  // const [isShowPwd, setShowPwd] = useState(false);
  // const [pwdTypeText, setPwdType] = useState(false);

  // const handleChange = (e) => {
  //   e.preventDefault();
  //   setValues({ ...values, [e.target.name]: e.target.value });
  // };

  // const handleClickShowHide = (e) => {
  //   e.preventDefault();
  //   setShowPwd(!isShowPwd);
  //   setPwdType(!pwdTypeText);
  // };

  // const handleClick = (e) => {
  //   logout();

  //   setTimeout(() => {
  //     navigate('/login');
  //   }, 1000);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   setAlert(!isAlert);

  //   firstLogin({ pwd: values.pwd, pwdConfirm: values.pwdConfirm });
  // };

  // useEffect(() => {
  //   switchPage();
  //   resetAlert();
  //   if (!isFirstLogin) {
  //     console.log('-----------navigate success here--------------');
  //     navigate('/dashboard');
  //     // setTimeout(() => {
  //     // }, 3000);
  //   } else {
  //     console.log('navigate error here');
  //   }
  // }, [isFirstLogin]);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <FirstLoginStyled>
      <section className="section-firstlogin">
        <Formik
          initialValues={{ password: '', newpassword: '' }}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            firstLogin(values.password, values.newpassword, loginSuccess);

            console.log(values);
          }}
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit} className="form__first-login">
              <div className="form__first-login--logo">
                <img src={logoBank} alt="logo" />

                <h3 className="heading--tertiary form__first-login--headtertiary">
                  ankist
                </h3>
              </div>
              <span className=" first-login__span">
                Your first login you need to change password
              </span>

              <Field name="password">
                {({ field, form, meta }) => (
                  <FormControl>
                    <MUIInputCustom02
                      {...field}
                      id="password"
                      name="password"
                      label="Password"
                      value={props.values.password}
                      onChange={props.handleChange}
                      error={
                        props.touched.password && Boolean(props.errors.password)
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
              <Field name="newpassword">
                {({ field, form, meta }) => (
                  <FormControl>
                    <MUIInputCustom02
                      {...field}
                      id="newpassword"
                      name="newpassword"
                      label="New password"
                      value={props.values.newpassword}
                      onChange={props.handleChange}
                      error={
                        props.touched.newpassword &&
                        Boolean(props.errors.newpassword)
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
                    <FormHelperText
                      id="component-helper-text"
                      sx={{
                        fontSize: '1.2rem',
                        color: 'var(--color-tertiary-dark-2)',
                      }}
                    >
                      {props.touched.newpassword && props.errors.newpassword}
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
                  sx={{ alignSelf: 'center' }}
                >
                  Changing is processing...
                </MUIButtonLoading01>
              ) : (
                <MUIButtonCustom02
                  variant="contained"
                  type="submit"
                  sx={{ alignSelf: 'center' }}
                >
                  Submit
                </MUIButtonCustom02>
              )}
            </Form>
          )}
        </Formik>

        <Toast position={'top-right'}></Toast>
      </section>
    </FirstLoginStyled>
  );
};

export default FirstLogin;
