import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
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

import LoginStyled from '../theme/pages/Login';
import {
  DefaultButton,
  LoginButton,
  Button83,
  ContactButton,
  DownloadButton,
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

const validationSchema = yup.object({
  phone: yup
    .string('Enter your phone')
    .required('Email is required')
    .min(5, 'Phone should be of minimum 5 characters length'),
  email: yup
    .string('Enter your email')
    .email('Enter valid email')
    .required('Email is required'),
});

const NewRegister = () => {
  const {
    isLoading,
    switchPage,
    actionRegisterPage,
    registerPage,
    registerNode,
  } = useGlobalContext();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      phone: '',
      email: '',
      name: '',
      address: '',
      birth: '',
      imageFront: new File([], 'https://picsum.photos/100'),
      imageBack: new File([], 'https://picsum.photos/100'),
    },
    validationSchema: validationSchema,
    onChange: (value) => {
      console.log(value);
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      console.log(values);
    },
  });

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
              <form
                className="new-register__form"
                onSubmit={formik.handleSubmit}
              >
                {registerPage.numPage === 1 && (
                  <FormControl>
                    <MUIInputCustom02
                      id="phone"
                      name="phone"
                      label="Phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.phone && Boolean(formik.errors.phone)
                      }
                      // helperText={formik.touched.phone && formik.errors.phone}
                    />
                  </FormControl>
                )}
                {registerPage.numPage === 2 && (
                  <FormControl>
                    <MUIInputCustom02
                      id="email"
                      name="email"
                      label="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      // helperText={formik.touched.email && formik.errors.email}
                    ></MUIInputCustom02>
                  </FormControl>
                )}
                {registerPage.numPage === 3 && (
                  <FormControl>
                    <MUIInputCustom02
                      id="name"
                      name="Name"
                      label="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      // helperText={formik.touched.name && formik.errors.name}
                    />
                  </FormControl>
                )}
                {registerPage.numPage === 4 && (
                  <FormControl>
                    <MUIInputCustom02
                      id="address"
                      name="address"
                      label="Address"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.address && Boolean(formik.errors.address)
                      }
                      helperText={
                        formik.touched.address && formik.errors.address
                      }
                    />
                  </FormControl>
                )}
                {registerPage.numPage === 5 && (
                  <FormControl>
                    <MUIInputCustom02
                      type={'date'}
                      id="birth"
                      name="birth"
                      label="Birth"
                      value={formik.values.birth}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.birth && Boolean(formik.errors.birth)
                      }
                      helperText={formik.touched.birth && formik.errors.birth}
                    />
                  </FormControl>
                )}
                {registerPage.numPage === 6 && (
                  <FormControl sx={{ display: 'grid', rowGap: '0.8rem' }}>
                    <MUIButtonCustom04 variant="contained" component="label">
                      Upload File Front
                      <input
                        type="file"
                        id="imageFront"
                        name="imageFront"
                        label="imageFront"
                        value={formik.values.imageFront}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.imageFront &&
                          Boolean(formik.errors.imageFront)
                        }
                        helperText={
                          formik.touched.imageFront && formik.errors.imageFront
                        }
                        hidden
                        // {...field}
                      />
                    </MUIButtonCustom04>

                    {/* <DefaultParagraph
                      inputSize="1.2rem"
                      className="justify-self__end"
                    >
                      {getValues().imageFront
                        ? `${getValues().imageFront[0].name}`
                        : `Name image here`}
                    </DefaultParagraph> */}
                  </FormControl>
                )}
                {registerPage.numPage === 7 && (
                  <FormControl sx={{ display: 'grid', rowGap: '0.8rem' }}>
                    <MUIButtonCustom04 variant="contained" component="label">
                      Upload File Back
                      <input
                        type="file"
                        hidden
                        id="imageBack"
                        name="imageBack"
                        label="imageBack"
                        value={formik.values.imageBack}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.imageBack &&
                          Boolean(formik.errors.imageBack)
                        }
                        helperText={
                          formik.touched.imageBack && formik.errors.imageBack
                        }
                      />
                    </MUIButtonCustom04>

                    {/* <DefaultParagraph
                      inputSize="1.2rem"
                      className="justify-self__end"
                    > */}
                    {/* {getValues().imageFront
                        ? `${getValues().imageFront[0].name}`
                        : `Name image here`}
                    </DefaultParagraph> */}
                  </FormControl>
                )}
                {registerPage.numPage === 8 && <Box>Success</Box>}

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
                  {' '}
                  <MUIButtonCustom02
                    variant="contained"
                    type="button"
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
                      type="button"
                      variant="contained"
                      onClick={handleClickNext}
                    >
                      Next
                    </MUIButtonCustom02>
                  )}
                </FormControl>
              </form>
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
      </section>
    </NewRegisterStyled>
  );
};

export default NewRegister;
