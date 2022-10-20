import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as yup from 'yup';
import {
  Loading,
  Alert,
  CountDown,
  Toast,
  CustomizedSteppers,
} from '../components';
import { useGlobalContext } from '../context/appContext';
import loginImage from '../assets/images/login_1.svg';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import defaultAvt from '../assets/images/avt/user.png';

import LoginStyled from '../theme/pages/Login';
import {
  DefaultButton,
  LoginButton,
  Button83,
  ContactButton,
  DownloadButton,
  MUIButtonLoading01,
} from '../theme/components/Buttons';

import { useForm, Controller } from 'react-hook-form';

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
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import {
  MUIInputCustom01,
  MUIInputCustom02,
  MUIFileInputStyled,
  MUIFileInputCustom,
} from '../theme/components/Input';
import {
  MUIButtonCustom02,
  MUIButtonCustom03,
  MUIButtonCustom04,
  MUIComplexButton,
} from '../theme/components/Buttons';
import { HeadingPrimary, DefaultParagraph } from '../theme/base/Typography';

import NewRegisterStyled from '../theme/pages/NewRegister';

import { BsFacebook, BsMenuButton } from 'react-icons/bs';
import { AiFillInstagram, AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import SendIcon from '@mui/icons-material/Send';

const validationSchema = yup.object({
  phone: yup
    .string('Enter your phone')
    .required('Phone is required')
    .min(8, 'Phone should be of minimum 8 characters length')
    .max(13, 'Phone should be of maximum 13 characters length'),
  email: yup
    .string('Enter your email')
    .email('Enter valid email')
    .required('Email is required'),
  address: yup.string('Enter your address').required('Address is required'),
  name: yup.string('Enter your name').required('Name is required'),
});

const initErrorFormilk = {
  isError: false,
  msgError: '',
};

const NewRegister = () => {
  const {
    isLoading,
    switchPage,
    actionRegisterPage,
    registerPage,
    registerNode,
    isLoadingForm,
    isErrorForm,
    messageErrorForm,
    registerTempUser,
  } = useGlobalContext();

  const navigate = useNavigate();

  const [imgBackLink, setImgBackLink] = useState('');
  const [imgFrontLink, setImgFrontLink] = useState('');
  const [isErrorFormik, setErrorFormilk] = useState(initErrorFormilk);

  const handleClickNext = (e) => {
    actionRegisterPage({
      numPage: registerPage.numPage,
      isOK: true,
      type: 'plus',
      length: 8,
    });
  };

  const handleClickPre = (e) => {
    actionRegisterPage({
      numPage: registerPage.numPage,
      isOK: true,
      type: 'minus',
      length: 8,
    });
  };

  const handleSwitchPage = (inputPath) => {
    switchPage();
    navigate(inputPath);
  };

  const validationEmail = (value) => {
    let error;

    if (isErrorForm) {
      if (value === registerTempUser.email) {
        error = messageErrorForm;
      }
    }
    return error;
  };
  const validationPhone = (value) => {
    let error;

    if (isErrorForm) {
      if (value === registerTempUser.email) {
        error = messageErrorForm;
      }
    }
    return error;
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <NewRegisterStyled>
      <section className="section__new-register">
        <div className="new-register">
          <div className="new-register__left">
            <div className="new-register__right--header">
              <HeadingPrimary
                inputColor="var(--color-primary-dark-5)"
                inputSize="2.4rem"
              >
                REGISTER
              </HeadingPrimary>
            </div>
            <CustomizedSteppers></CustomizedSteppers>

            <div className="new-register__right--body">
              {registerPage.numPage < 8 && (
                <Formik
                  initialValues={{
                    phone: '',
                    email: '',
                    name: '',
                    address: '',
                    birth: '',
                    imageFront: new File([], ''),
                    imageBack: new File([], ''),
                    // imageFront: null,
                    // imageBack: null,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={async (values, actions) => {
                    console.log('Submit here');
                    console.log(values);

                    const {
                      phone,
                      email,
                      name,
                      address,
                      birth,
                      imageFront,
                      imageBack,
                    } = values;

                    registerNode(
                      {
                        phone: phone,
                        email: email,
                        name: name,
                        address: address,
                        birth: birth,
                        imageFront: imageFront,
                        imageBack: imageBack,
                      },
                      actions
                    );

                    // const imageFrontUrl = URL.createObjectURL(imageFront);
                    // const imageBackUrl = URL.createObjectURL(imageBack);

                    // setImgFrontLink(imageFrontUrl);
                    // setImgBackLink(imageBackUrl);

                    // console.log(imageFront);

                    // console.log(imageFrontUrl);

                    // actions.submitForm(true);
                  }}
                >
                  {(props) => (
                    <Form
                      onSubmit={props.handleSubmit}
                      className="new-register__form"
                    >
                      {registerPage.numPage === 1 && (
                        <Field name="phone">
                          {({ field, form, meta }) => (
                            <FormControl>
                              <MUIInputCustom02
                                {...field}
                                id="phone"
                                name="phone"
                                label="phone"
                                value={props.values.phone}
                                onChange={props.handleChange}
                                error={
                                  props.touched.phone &&
                                  Boolean(props.errors.phone)
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
                                {props.touched.phone && props.errors.phone}
                              </FormHelperText>
                            </FormControl>
                          )}
                        </Field>
                      )}
                      {registerPage.numPage === 2 && (
                        <Field name="email" validate={validationEmail}>
                          {({ field, form, meta }) => (
                            <FormControl>
                              <MUIInputCustom02
                                {...field}
                                id="email"
                                name="email"
                                label="email"
                                value={props.values.email}
                                onChange={props.handleChange}
                                error={
                                  props.touched.email &&
                                  Boolean(props.errors.email)
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
                                {props.touched.email && props.errors.email}
                              </FormHelperText>
                            </FormControl>
                          )}
                        </Field>
                      )}
                      {registerPage.numPage === 3 && (
                        <Field name="name">
                          {({ field, form, meta }) => (
                            <FormControl>
                              <MUIInputCustom02
                                {...field}
                                id="name"
                                name="name"
                                label="name"
                                value={props.values.name}
                                onChange={props.handleChange}
                                error={
                                  props.touched.name &&
                                  Boolean(props.errors.name)
                                }
                                aria-describedby="component-helper-text"
                                // disabled={isCountDown}
                                // helperText={
                                //   props.touched.name && props.errors.name
                                // }
                              />
                              <FormHelperText
                                id="component-helper-text"
                                sx={{
                                  fontSize: '1.2rem',
                                  color: 'var(--color-tertiary-dark-2)',
                                }}
                              >
                                {props.touched.name && props.errors.name}
                              </FormHelperText>
                            </FormControl>
                          )}
                        </Field>
                      )}
                      {registerPage.numPage === 4 && (
                        <Field name="address">
                          {({ field, form, meta }) => (
                            <FormControl>
                              <MUIInputCustom02
                                {...field}
                                id="address"
                                name="address"
                                label="address"
                                value={props.values.address}
                                onChange={props.handleChange}
                                error={
                                  props.touched.address &&
                                  Boolean(props.errors.address)
                                }
                                aria-describedby="component-helper-text"
                                // disabled={isCountDown}
                                // helperText={
                                //   props.touched.address && props.errors.address
                                // }
                              />
                              <FormHelperText
                                id="component-helper-text"
                                sx={{
                                  fontSize: '1.2rem',
                                  color: 'var(--color-tertiary-dark-2)',
                                }}
                              >
                                {props.touched.address && props.errors.address}
                              </FormHelperText>
                            </FormControl>
                          )}
                        </Field>
                      )}
                      {registerPage.numPage === 5 && (
                        <Field name="birth">
                          {({ field, form, meta }) => (
                            <FormControl>
                              <MUIInputCustom02
                                {...field}
                                id="birth"
                                name="birth"
                                label="birth"
                                value={props.values.birth}
                                onChange={props.handleChange}
                                error={
                                  props.touched.birth &&
                                  Boolean(props.errors.birth)
                                }
                                aria-describedby="component-helper-text"
                                // disabled={isCountDown}
                                // helperText={
                                //   props.touched.birth && props.errors.birth
                                // }
                              />
                              <FormHelperText
                                id="component-helper-text"
                                sx={{
                                  fontSize: '1.2rem',
                                  color: 'var(--color-tertiary-dark-2)',
                                }}
                              >
                                {props.touched.birth && props.errors.birth}
                              </FormHelperText>
                            </FormControl>
                          )}
                        </Field>
                      )}
                      {registerPage.numPage === 6 && (
                        <FormControl
                          sx={{
                            display: 'grid',
                            rowGap: '0.8rem',
                            gridTemplateColumns: '1fr 1fr',
                            alignItems: 'center',
                          }}
                        >
                          <MUIButtonCustom04
                            variant="contained"
                            component="label"
                          >
                            Image front
                            <input
                              type="file"
                              hidden
                              id="imageFront"
                              name="imageFront"
                              onChange={(event) => {
                                const files = event.target.files[0];
                                // let myFiles = Array.from(files);
                                props.setFieldValue('imageFront', files);
                              }}
                            />
                          </MUIButtonCustom04>

                          <DefaultParagraph
                            inputSize="1.2rem"
                            className="justify-self__start"
                          >
                            {props.values.imageFront.name}
                          </DefaultParagraph>

                          <ImageList
                            sx={{
                              gridArea: '1 / 2 / 3 / 3',
                              justifySelf: 'end',
                            }}
                          >
                            <ImageListItem
                              sx={{ width: 64, height: 64, objectFit: 'cover' }}
                            >
                              <img
                                src={
                                  props.values.imageFront.name
                                    ? URL.createObjectURL(
                                        props.values.imageFront
                                      )
                                    : defaultAvt
                                }
                              />
                            </ImageListItem>
                            <ImageListItem
                              sx={{ width: 64, height: 64, objectFit: 'cover' }}
                            >
                              <img
                                src={
                                  props.values.imageBack.name
                                    ? URL.createObjectURL(
                                        props.values.imageBack
                                      )
                                    : defaultAvt
                                }
                              />
                            </ImageListItem>
                          </ImageList>
                        </FormControl>
                      )}

                      {registerPage.numPage === 7 && (
                        <>
                          <FormControl
                            sx={{
                              display: 'grid',
                              rowGap: '0.8rem',
                              gridTemplateColumns: '1fr 1fr',
                              alignItems: 'center',
                            }}
                          >
                            <MUIButtonCustom04
                              variant="contained"
                              component="label"
                            >
                              Image back
                              <input
                                type="file"
                                hidden
                                id="imageBack"
                                name="imageBack"
                                onChange={(event) => {
                                  const files = event.target.files[0];
                                  // let myFiles = Array.from(files);
                                  props.setFieldValue('imageBack', files);
                                }}
                              />
                            </MUIButtonCustom04>

                            <DefaultParagraph
                              inputSize="1.2rem"
                              className="justify-self__start"
                            >
                              {props.values.imageBack.name}
                            </DefaultParagraph>

                            <ImageList
                              sx={{
                                gridArea: '1 / 2 / 3 / 3',
                                justifySelf: 'end',
                              }}
                            >
                              <ImageListItem
                                sx={{
                                  width: 64,
                                  height: 64,
                                  objectFit: 'cover',
                                }}
                              >
                                <img
                                  src={
                                    props.values.imageFront.name
                                      ? URL.createObjectURL(
                                          props.values.imageFront
                                        )
                                      : defaultAvt
                                  }
                                />
                              </ImageListItem>
                              <ImageListItem
                                sx={{
                                  width: 64,
                                  height: 64,
                                  objectFit: 'cover',
                                }}
                              >
                                <img
                                  src={
                                    props.values.imageBack.name
                                      ? URL.createObjectURL(
                                          props.values.imageBack
                                        )
                                      : defaultAvt
                                  }
                                />
                              </ImageListItem>
                            </ImageList>
                          </FormControl>

                          <FormControl
                            sx={{
                              alignSelf: 'end',
                              justifySelf: 'end',
                              display: 'grid',
                              gridTemplateColumns: 'repeat(2, max-content)',
                              alignItems: 'center',
                              gap: '0 1.6rem',
                            }}
                          >
                            <MUIButtonCustom02
                              variant="contained"
                              type="button"
                              onClick={handleClickPre}
                            >
                              Back
                            </MUIButtonCustom02>

                            {isLoadingForm ? (
                              <MUIButtonLoading01
                                // onClick={handleClick}
                                endIcon={<SendIcon />}
                                loading={isLoadingForm}
                                loadingPosition="end"
                                variant="contained"
                              >
                                Register...
                              </MUIButtonLoading01>
                            ) : (
                              <MUIButtonCustom02
                                variant="contained"
                                type="submit"
                              >
                                Register
                              </MUIButtonCustom02>
                            )}
                          </FormControl>
                        </>
                      )}
                      {/* {registerPage.numPage === 8 && (
                      <MUIButtonCustom02 variant="contained" type="submit">
                        Submit
                      </MUIButtonCustom02>
                    )} */}
                      {/* <FormControl
                      sx={{
                        alignSelf: 'end',
                        justifySelf: 'end',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, max-content)',
                        alignItems: 'center',
                        gap: '0 1.6rem',
                      }}
                    >
                      <MUIButtonCustom02
                        type="button"
                        variant="contained"
                        onClick={handleClickPre}
                      >
                        Back
                      </MUIButtonCustom02>
                      {registerPage.numPage === 7 ? (
                        <MUIButtonCustom02 variant="contained" type="submit">
                          Submit
                        </MUIButtonCustom02>
                      ) : (
                        <MUIButtonCustom02
                          variant="contained"
                          type="button"
                          onClick={handleClickNext}
                        >
                          Next
                        </MUIButtonCustom02>
                      )}
                    </FormControl> */}
                    </Form>
                  )}
                </Formik>
              )}

              {registerPage.numPage < 7 && (
                <FormControl
                  sx={{
                    alignSelf: 'end',
                    justifySelf: 'end',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, max-content)',
                    alignItems: 'center',
                    gap: '0 1.6rem',
                  }}
                >
                  <MUIButtonCustom02
                    variant="contained"
                    type="button"
                    onClick={handleClickPre}
                  >
                    Back
                  </MUIButtonCustom02>
                  <MUIButtonCustom02
                    type="button"
                    variant="contained"
                    onClick={handleClickNext}
                  >
                    Next
                  </MUIButtonCustom02>
                </FormControl>
              )}

              {registerPage.numPage === 8 && (
                <div className="new-register__right--result">
                  {/* <h2 className="new-register__right--result-heading">
                    Success
                  </h2>
                  <p className="new-register__right--result-text">
                    Please check you email to validation account!
                  </p> */}
                  {isErrorForm ? (
                    <>
                      <HeadingPrimary
                        inputSize="2rem"
                        inputColor="var(--color-tertiary-dark-3)"
                      >
                        Error
                      </HeadingPrimary>
                      <DefaultParagraph
                        inputSize="1.4rem"
                        inputColor="var(--color-tertiary-dark)"
                      >
                        Error here
                      </DefaultParagraph>
                    </>
                  ) : (
                    <>
                      <HeadingPrimary
                        inputColor="var(--color-grey-light-3)"
                        inputSize="2rem"
                      >
                        Success
                      </HeadingPrimary>
                      <DefaultParagraph
                        inputColor="var(--color-grey-light-1)"
                        inputSize="1.4rem"
                      >
                        Please check your email to validation account!
                      </DefaultParagraph>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="new-register__right">
            <div className="new-register__right--header-icons">
              <div className="new-register__icon-container">
                <AiFillInstagram className="new-register__icon"></AiFillInstagram>
              </div>
              <div className="new-register__icon-container">
                <BsFacebook className="new-register__icon"></BsFacebook>
              </div>
            </div>
            <HeadingPrimary inputColor="var(--color-white)" inputSize="2.8rem">
              Welcome to register
            </HeadingPrimary>
            <DefaultParagraph inputColor="var(--color-white)">
              Alreay have account
            </DefaultParagraph>
            <MUIButtonCustom03 onClick={() => handleSwitchPage('/new-login')}>
              Login
            </MUIButtonCustom03>
          </div>
        </div>

        <Toast position={'top-right'}></Toast>
      </section>
    </NewRegisterStyled>
  );
};

export default NewRegister;
