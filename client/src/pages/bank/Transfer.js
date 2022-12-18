import React, { useState } from 'react';

import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  InputBase,
  InputLabel,
  TextField,
  FormControl,
  FormControlLabel,
  Input,
  FilledInput,
  FormHelperText,
  FormGroup,
  FormLabel,
  Alert,
  AlertTitle,
  TextareaAutosize,
  Tooltip,
  ButtonGroup,
} from '@mui/material';

import {
  Modal,
  ModalClose,
  ModalDialog,
  Chip,
  Radio,
  RadioGroup,
  Typography,
  ChipDelete,
} from '@mui/joy';

import { LoadingButton } from '@mui/lab';

import { pink } from '@mui/material/colors';

import { FaLinux, FaGithub } from 'react-icons/fa';

import { Toast } from '../../components';

import { useGlobalContext } from '../../context/appContext';

import { Formik, Form, Field, ErrorMessage, useFormik, useField } from 'formik';
import * as yup from 'yup';

import {
  MUIInputCustom01,
  MUIInputCustom02,
  MUIFileInputStyled,
  MUIFileInputCustom,
} from '../../theme/components/Input';

import FaceIcon from '@mui/icons-material/Face';

import CheckIcon from '@mui/icons-material/Check';

// import { SteppBank } from '../../components';

const steps = [
  {
    label: 'First step',
    description: `Enter amount`,
  },
  {
    label: 'Second step',
    description: 'Enter phone',
  },
  {
    label: 'Third step',
    description: `Information`,
  },
  {
    label: 'Fourth step',
    description: `OTP`,
  },
  {
    label: 'Final step',
    description: `Success`,
  },
];

const initState = {
  money: '',
  idCard: '',
  cvv: '',
  date: '',
  fee: 'me',
};

const longText = `
Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.
Praesent non nunc mollis, fermentum neque at, semper arcu.
Nullam eget est sed sem iaculis gravida eget vitae justo.
`;

const Transfer = () => {
  const [getNext, setNext] = useState(0);

  // const [values, setValues] = useState(initState);

  const [activeStep, setActiveStep] = useState(0);
  const [selected, setSelected] = React.useState('');

  const {
    showToast,
    actionBankPage,
    bankPage,
    confirmMoneyInput,
    isCorrectMoney,
    transferMoneyApp,
    isLoadingForm,
    transferSendOtp,
    getSingleUser,
    user,
    getSingleUserToTransfer,
    toUserTransfer,
  } = useGlobalContext();

  const validateMoney = (value) => {
    let error;

    if (!value) {
      error = 'This is required';
    }
    if (value % 10000 !== 0) {
      error = 'Money must devide 10000';
    }
    return error;
  };
  const validatePhone = (value) => {
    let error;

    if (!value) {
      error = 'This is required';
    }
    if (value.length < 8) {
      error = 'Phone must at least 8 characters';
    }
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
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    actionBankPage({
      numPage: bankPage.numPage,
      name: 'transfer',
      length: 5,
      actionType: 'plus',
      isOK: inputOk,
    });
  };

  const handleClickBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

    actionBankPage({
      numPage: bankPage.numPage,
      name: 'transfer',
      length: 5,
      actionType: 'minus',
      isOK: true,
    });
  };

  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  return (
    <div className="bank-body__transfer">
      <div className="transfer-header">
        <h1 className="transfer-header__heading--primary">Transfer</h1>
      </div>
      <div className="transfer-body">
        <div className="transfer-body__left">
          <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel StepIconComponent={FaLinux} sx={{ fontSize: 28 }}>
                    <Typography sx={{ fontSize: 16 }}>{step.label}</Typography>
                  </StepLabel>
                  <StepContent>
                    <Typography sx={{ fontSize: 12 }}>
                      {step.description}
                    </Typography>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} sx={{ p: 3 }}>
                <Typography>
                  All steps completed - you&apos;re finished
                </Typography>
              </Paper>
            )}
          </Box>
        </div>
        <div className="transfer-body__right">
          {/* {bankPage.numPage === 1 && ( */}
          <div className="transfer-body__right--header">
            <Tooltip title={longText}>
              <Button sx={{ m: 1 }}>Default Width [300px]</Button>
            </Tooltip>
          </div>
          {/* )} */}
          <div className="transfer-body__right--body">
            <Formik
              initialValues={{
                money: '',
                note: '',
                otp: '',
                fee: 'Me',
                phone: '',
              }}
              // validationSchema={validationSchema}
              onSubmit={async (values, actions) => {
                console.log('submit here');
                // actions.setFieldValue('idCard', otp);
                console.log(values);

                transferMoneyApp({
                  money: values.money,
                  numberPhone: values.phone,
                  message: values.note,
                  userBearFee: values.fee,
                  otpTransaction: values.otp,
                });

                getSingleUser(user?._id);
              }}
            >
              {(props) => (
                <Form onSubmit={props.handleSubmit} className="transfer-form">
                  {bankPage.numPage === 1 && (
                    <Box
                      sx={{
                        width: '85%',
                        display: 'grid',
                        gridTemplateRows: 'repeat(3, max-content)',
                        rowGap: '1.6rem',
                      }}
                    >
                      <Field name="money" validate={validateMoney}>
                        {({ field, form, meta }) => (
                          <FormControl>
                            <MUIInputCustom02
                              {...field}
                              id="money"
                              name="money"
                              label="Money"
                              value={props.values.money}
                              onChange={props.handleChange}
                              error={
                                props.touched.money &&
                                Boolean(props.errors.money)
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
                              {props.touched.money && props.errors.money}
                            </FormHelperText>
                          </FormControl>
                        )}
                      </Field>
                      <Box>
                        <RadioGroup
                          name="money"
                          aria-labelledby="best-movie"
                          row
                          sx={{ flexWrap: 'wrap', gap: 1 }}
                        >
                          {['50000', '100000', '200000', '500000'].map(
                            (name) => {
                              const checked = selected === name;
                              return (
                                <Chip
                                  key={name}
                                  variant={checked ? 'soft' : 'plain'}
                                  color={checked ? 'primary' : 'neutral'}
                                  // endDecorator={checked && <ChipDelete />}
                                  startDecorator={
                                    checked && (
                                      <CheckIcon
                                        sx={{
                                          zIndex: 1,
                                          pointerEvents: 'none',
                                        }}
                                      />
                                    )
                                  }
                                >
                                  <Radio
                                    sx={{ fontSize: '1.2rem' }}
                                    variant="outlined"
                                    color={checked ? 'primary' : 'neutral'}
                                    disableIcon
                                    overlay
                                    label={name}
                                    value={name}
                                    checked={checked}
                                    onChange={(event) => {
                                      if (event.target.checked) {
                                        setSelected(name);
                                        props.setFieldValue('money', name);
                                        // props.handleChange();
                                      }
                                    }}
                                  />
                                </Chip>
                              );
                            }
                          )}
                        </RadioGroup>
                      </Box>

                      <TextareaAutosize
                        name="note"
                        value={props.values.note}
                        onChange={props.handleChange}
                        minRows={5}
                        aria-label="maximum height"
                        placeholder="Maximum 4 rows"
                        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua."
                        style={{ width: '100%', padding: '1.2rem 2.4rem' }}
                      />
                    </Box>
                  )}
                  {bankPage.numPage == 2 && (
                    <Box
                      sx={{
                        width: '85%',
                        display: 'grid',
                        gridTemplateRows: 'max-content',
                        rowGap: '1.6rem',
                      }}
                    >
                      <Field name="phone" validate={validatePhone}>
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
                  {bankPage.numPage == 3 && (
                    <Box
                      sx={
                        {
                          // width: '85%',
                          // display: 'grid',
                          // gridTemplateRows: 'repeat(3, max-content)',
                          // rowGap: '1.6rem',
                        }
                      }
                    >
                      <div className="transfer-information__body">
                        <div className="transfer-information__control">
                          <FaGithub></FaGithub>
                          <h3 className="transfer-information__heading">
                            From
                          </h3>

                          <p className="transfer-information__text">
                            {user?.name}
                          </p>
                        </div>
                        <div className="transfer-information__control">
                          <FaGithub></FaGithub>
                          <h3 className="transfer-information__heading">To</h3>

                          <p className="transfer-information__text">
                            {toUserTransfer?.name}
                          </p>
                        </div>
                        <div className="transfer-information__control">
                          <FaGithub></FaGithub>
                          <h3 className="transfer-information__heading">
                            Money
                          </h3>

                          <p className="transfer-information__text">
                            {props.values.money}
                          </p>
                        </div>
                        <div className="transfer-information__control">
                          <FaGithub></FaGithub>
                          <h3 className="transfer-information__heading">Fee</h3>

                          <div className="transfer-information__radios">
                            <FormControl>
                              <RadioGroup
                                defaultValue="friend"
                                name="fee"
                                value={props.values.fee}
                                onChange={props.handleChange}
                                row
                                sx={{ gap: 2, mt: 1 }}
                              >
                                <Radio value="Me" label="Me" />
                                <Radio value="Friend" label="Friend" />
                              </RadioGroup>
                            </FormControl>
                          </div>
                        </div>
                      </div>
                    </Box>
                  )}
                  {bankPage.numPage === 4 && (
                    <div className="transfer-form transfer-2">
                      <Box
                        sx={{
                          height: '100%',
                          display: 'grid',
                          gridTemplateRows: '1fr max-content',
                          paddingBottom: '3.2rem',
                        }}
                      >
                        <>
                          <Field name="otp" validate={validateOTP}>
                            {({ field, form, meta }) => (
                              <FormControl>
                                <MUIInputCustom02
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
                            {bankPage.numPage === 4 && (
                              <>
                                <Button onClick={() => handleClickBack()}>
                                  Back
                                </Button>
                                <LoadingButton
                                  loading={isLoadingForm}
                                  type="submit"
                                  onClick={() => {
                                    // props.submitForm();
                                  }}
                                >
                                  Submit
                                </LoadingButton>
                              </>
                            )}
                          </ButtonGroup>
                        </>
                      </Box>
                    </div>
                  )}

                  {bankPage.numPage === 5 && (
                    <Box sx={{ height: '100%' }}>
                      <h2 className="heading--secondary">Transfer success</h2>
                    </Box>
                  )}

                  <ButtonGroup
                    disableElevation
                    variant="contained"
                    aria-label="Disabled elevation buttons"
                    sx={{ justifySelf: 'end', alignSelf: 'end', gap: '1.2rem' }}
                  >
                    {bankPage.numPage === 1 && (
                      <>
                        {bankPage.numPage !== 1 && (
                          <Button onClick={() => handleClickBack()}>
                            Back
                          </Button>
                        )}
                        <Button
                          onClick={() => {
                            console.log(props.errors.money === undefined);

                            if (props.errors.money !== undefined) {
                              showToast(props.errors.money, 3000, 'error');
                              handleClickNext(props.errors.money === undefined);
                            } else if (props.errors.phone !== undefined) {
                              showToast(props.errors.phone, 3000, 'error');
                              handleClickNext(false);
                            } else {
                              handleClickNext(true);
                            }
                          }}
                        >
                          Next
                        </Button>
                      </>
                    )}
                    {bankPage.numPage === 2 && (
                      <>
                        {bankPage.numPage !== 1 && (
                          <Button onClick={() => handleClickBack()}>
                            Back
                          </Button>
                        )}
                        <Button
                          onClick={() => {
                            console.log(props.errors.money === undefined);

                            console.log(props.values.phone);
                            getSingleUserToTransfer(props.values.phone);

                            if (props.errors.money !== undefined) {
                              showToast(props.errors.money, 3000, 'error');
                              handleClickNext(props.errors.money === undefined);
                            } else if (props.errors.phone !== undefined) {
                              showToast(props.errors.phone, 3000, 'error');
                              handleClickNext(false);
                            } else {
                              handleClickNext(true);
                            }
                          }}
                        >
                          Next
                        </Button>
                      </>
                    )}
                    {bankPage.numPage === 3 && (
                      <>
                        {bankPage.numPage !== 1 && (
                          <Button onClick={() => handleClickBack()}>
                            Back
                          </Button>
                        )}
                        <LoadingButton
                          loading={isLoadingForm}
                          type="button"
                          onClick={() => {
                            console.log(props.values.fee, props.values.money);

                            transferSendOtp({
                              money: props.values.money,
                              numberPhone: props.values.phone,
                              message: props.values.note,
                              userBearFee: props.values.fee,
                            });
                          }}
                        >
                          Send
                        </LoadingButton>
                      </>
                    )}
                  </ButtonGroup>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      {/* <Toast position={'bottom-right'}></Toast> */}
    </div>
  );
};

export default Transfer;
