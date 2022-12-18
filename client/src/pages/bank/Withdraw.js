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

import { pink } from '@mui/material/colors';

import { FaLinux, FaGithub } from 'react-icons/fa';

import { Toast } from '../../components';

import { useGlobalContext } from '../../context/appContext';

import { Formik, Form, Field, ErrorMessage, useFormik, useField } from 'formik';
// import { TimePicker, DatePicker, DateTimePicker } from 'formik-mui-lab';
import * as yup from 'yup';

import {
  MUIInputCustom01,
  MUIInputCustom02,
  MUIInputCustom03,
  MUIFileInputStyled,
  MUIFileInputCustom,
  RedditTextField,
} from '../../theme/components/Input';
import {
  DefaultButton,
  LoginButton,
  Button83,
  ContactButton,
  DownloadButton,
  ButtonAccountEdit,
  MUIButtonCustom01,
  MUIButtonCustom02,
  MUIButtonCustom03,
  MUIButtonCustom04,
  MUIButtonLoading01,
} from '../../theme/components/Buttons';

import FaceIcon from '@mui/icons-material/Face';

import CheckIcon from '@mui/icons-material/Check';

import { LoadingButton } from '@mui/lab';

// import { SteppBank } from '../../components';

const steps = [
  {
    label: 'First step',
    description: `Enter amount`,
  },
  {
    label: 'Second step',
    description: 'Enter your information',
  },
  {
    label: 'Final step',
    description: `Success`,
  },
];

const longText = `
Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.
Praesent non nunc mollis, fermentum neque at, semper arcu.
Nullam eget est sed sem iaculis gravida eget vitae justo.
`;

const Withdraw = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selected, setSelected] = React.useState('');
  const [selectedValue, setSelectedValue] = React.useState('a');
  const [open, setOpen] = React.useState('');

  const {
    actionBankPage,
    bankPage,
    confirmDigitalCard,
    isConfirmDigitalCard,
    showToast,
    isLoadingForm,
    withDrawApp,
    getSingleUser,
    userById,
    user,
  } = useGlobalContext();

  const validateMoney = (value) => {
    let error;

    if (!value) {
      error = 'This is required';
    }
    if (value % 50000 !== 0) {
      error = 'Money must devide 10000';
    }
    return error;
  };
  const validateIdCard = (value) => {
    let error;

    if (!value) {
      error = 'This is required';
    }
    if (value.length !== 6) {
      error = 'ID card must equal 6 characters';
    }
    return error;
  };
  const validateCvv = (value) => {
    let error;

    if (!value) {
      error = 'This is required';
    }
    if (value.length !== 3) {
      error = 'CVV must equal 3 characters';
    }
    return error;
  };
  const validateDate = (value) => {
    let error;

    if (!value) {
      error = 'This is required';
    }

    return error;
  };

  const handleClickNext = (e) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    actionBankPage({
      numPage: bankPage.numPage,
      name: 'withdraw',
      length: 3,
      actionType: 'plus',
      isOK: true,
    });
  };

  const handleClickBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

    actionBankPage({
      numPage: bankPage.numPage,
      name: 'withdraw',
      length: 3,
      actionType: 'minus',
      isOK: true,
    });
  };

  return (
    <div className="bank-body__withdraw">
      <div className="withdraw-header">
        <h1 className="withdraw-header__heading--primary">Withdraw</h1>
      </div>
      <div className="withdraw-body">
        <div className="withdraw-body__left">
          {/* <Stepper steps={steps} activeStep={activeStep}></Stepper> */}
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
        <div className="withdraw-body__right">
          <div className="withdraw-body__right--header">
            <Tooltip title={longText}>
              <Button sx={{ m: 1 }}>Default Width [300px]</Button>
            </Tooltip>
          </div>

          <Formik
            initialValues={{
              money: '',
              note: '',
              idCard: '',
              dateEnd: '',
              cvv: '',
            }}
            // validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
              console.log('submit here');
              // actions.setFieldValue('idCard', otp);
              console.log(values);

              withDrawApp({
                money: values.money,
                numberCard: values.idCard,
                dateExpire: values.dateEnd,
                cvvNumber: values.cvv,
                message: values.note,
              });

              getSingleUser(user?._id);
            }}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit} className="withdraw-form">
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
                              props.touched.money && Boolean(props.errors.money)
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
                        {['50000', '100000', '200000', '500000'].map((name) => {
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
                        })}
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
                    <Field name="idCard" validate={validateIdCard}>
                      {({ field, form, meta }) => (
                        <FormControl>
                          <MUIInputCustom02
                            {...field}
                            id="idCard"
                            name="idCard"
                            label="ID Card"
                            value={props.values.idCard}
                            onChange={props.handleChange}
                            error={
                              props.touched.idCard &&
                              Boolean(props.errors.idCard)
                            }
                          />
                          <FormHelperText
                            id="component-helper-text"
                            sx={{
                              fontSize: '1.2rem',
                              color: 'var(--color-tertiary-dark-2)',
                            }}
                          >
                            {props.touched.idCard && props.errors.idCard}
                          </FormHelperText>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="cvv" validate={validateCvv}>
                      {({ field, form, meta }) => (
                        <FormControl>
                          <MUIInputCustom02
                            {...field}
                            id="cvv"
                            name="cvv"
                            label="CVV"
                            value={props.values.cvv}
                            onChange={props.handleChange}
                            error={
                              props.touched.cvv && Boolean(props.errors.cvv)
                            }
                          />
                          <FormHelperText
                            id="component-helper-text"
                            sx={{
                              fontSize: '1.2rem',
                              color: 'var(--color-tertiary-dark-2)',
                            }}
                          >
                            {props.touched.cvv && props.errors.cvv}
                          </FormHelperText>
                        </FormControl>
                      )}
                    </Field>
                    {/* <Field component={DatePicker} name="date" label="Date" /> */}
                    <Field name="dateEnd" validate={validateDate}>
                      {({ field, form, meta }) => (
                        <FormControl>
                          <MUIInputCustom02
                            {...field}
                            type="date"
                            id="dateEnd"
                            name="dateEnd"
                            // label="ID Card"
                            value={props.values.dateEnd}
                            onChange={props.handleChange}
                            error={
                              props.touched.dateEnd &&
                              Boolean(props.errors.dateEnd)
                            }
                          />
                          <FormHelperText
                            id="component-helper-text"
                            sx={{
                              fontSize: '1.2rem',
                              color: 'var(--color-tertiary-dark-2)',
                            }}
                          >
                            {props.touched.dateEnd && props.errors.dateEnd}
                          </FormHelperText>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                )}

                {bankPage.numPage === 3 && (
                  <Box sx={{ height: '100%' }}>
                    <h2 className="heading--secondary">withdraw success</h2>
                  </Box>
                )}

                <ButtonGroup
                  disableElevation
                  variant="contained"
                  aria-label="Disabled elevation buttons"
                  sx={{ justifySelf: 'end', alignSelf: 'end', gap: '1.2rem' }}
                >
                  {bankPage.numPage < 2 && (
                    <>
                      {bankPage.numPage !== 1 && (
                        <Button onClick={() => handleClickBack()}>Back</Button>
                      )}
                      <Button
                        onClick={() => {
                          // console.log(props.errors.money === undefined);

                          // if (props.errors.money !== undefined) {
                          //   showToast(props.errors.money, 3000, 'error');
                          //   handleClickNext(props.errors.money === undefined);
                          // } else if (props.errors.phone !== undefined) {
                          //   showToast(props.errors.phone, 3000, 'error');
                          //   handleClickNext(false);
                          // } else {
                          //   handleClickNext(true);
                          // }
                          handleClickNext(true);
                        }}
                      >
                        Next
                      </Button>
                    </>
                  )}
                  {bankPage.numPage === 2 && (
                    <>
                      {bankPage.numPage !== 1 && (
                        <Button onClick={() => handleClickBack()}>Back</Button>
                      )}
                      <LoadingButton
                        type="submit"
                        loading={isLoadingForm}
                        onClick={() => {
                          // setOpen('plain');
                          // handleClickNext(true);
                        }}
                      >
                        Submit
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
  );
};

export default Withdraw;
