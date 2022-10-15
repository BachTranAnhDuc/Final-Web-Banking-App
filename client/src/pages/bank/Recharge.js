import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';
// import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
// import RadioGroup from '@mui/material/RadioGroup';
// import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import FormHelperText from '@mui/material/FormHelperText';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
// import Chip from '@mui/material/Chip';
import ButtonGroup from '@mui/material/ButtonGroup';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';

import { pink } from '@mui/material/colors';

import { MuiOtpInput } from 'mui-one-time-password-input';

import { FaLinux, FaGithub } from 'react-icons/fa';

import { Toast } from '../../components';

import { useGlobalContext } from '../../context/appContext';

import { Formik, Form, Field, ErrorMessage, useFormik, useField } from 'formik';
// import { TimePicker, DatePicker, DateTimePicker } from 'formik-mui-lab';
import * as yup from 'yup';

import {
  MUIInputCustom01,
  MUIInputCustom02,
  MUIFileInputStyled,
  MUIFileInputCustom,
} from '../../theme/components/Input';

import FaceIcon from '@mui/icons-material/Face';

import CheckIcon from '@mui/icons-material/Check';

import Chip from '@mui/joy/Chip';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Typography from '@mui/joy/Typography';
import ChipDelete from '@mui/joy/ChipDelete';

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

const Recharge = () => {
  const [selected, setSelected] = React.useState('');
  const [open, setOpen] = React.useState('');

  const [activeStep, setActiveStep] = useState(0);

  // const [getValidCard, setValidCard] = useState(false);
  // const [getValidMoney, setValidMoney] = useState(false);

  const {
    actionBankPage,
    bankPage,
    confirmDigitalCard,
    isConfirmDigitalCard,
    showToast,
  } = useGlobalContext();

  const validateMoney = (value) => {
    let error;

    if (!value) {
      error = 'This is required';
    }
    if (value % 50000 !== 0) {
      error = 'Money must devide 50000';
    }
    return error;
  };
  const validateIdCard = (value) => {
    let error;

    if (!value) {
      error = 'This is required';
    }
    if (value.length !== 6) {
      error = 'ID card must be 6 characters';
    }
    return error;
  };
  const validateCvv = (value) => {
    let error;

    if (!value) {
      error = 'This is required';
    }
    if (value.length !== 3) {
      error = 'Cvv card must be 3 characters';
    }
    return error;
  };
  const validateBirth = (value) => {
    let error;

    if (!value) {
      error = 'This is required';
    }

    return error;
  };

  const handleClickNext = (inputOk) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    actionBankPage({
      numPage: bankPage.numPage,
      name: 'recharge',
      length: 3,
      actionType: 'plus',
      isOK: true,
    });
  };

  const handleClickBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    actionBankPage({
      numPage: bankPage.numPage,
      name: 'recharge',
      length: 3,
      actionType: 'minus',
      isOK: true,
    });
  };

  return (
    <div className="bank-body__recharge">
      <div className="recharge-header">
        <h1 className="recharge-header__heading--primary">Recharge</h1>
      </div>
      <div className="recharge-body">
        <div className="recharge-body__left">
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
        <div className="recharge-body__right">
          <div className="recharge-body__right--header">
            <Tooltip title={longText}>
              <Button sx={{ m: 1 }}>Default Width [300px]</Button>
            </Tooltip>
          </div>

          <Formik
            initialValues={{
              money: '',
              idCard: '',
              dateEnd: '',
              cvv: '',
              password: '',
            }}
            // validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
              console.log('submit here');
              // actions.setFieldValue('idCard', otp);
              console.log(values);
            }}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit} className="recharge-form">
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
                    <Field name="dateEnd" validate={validateBirth}>
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
                    <h2 className="heading--secondary">recharge success</h2>
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
                          setOpen('plain');

                          // handleClickNext(true);
                        }}
                      >
                        Next
                      </Button>
                    </>
                  )}
                </ButtonGroup>
                <Modal open={!!open} onClose={() => setOpen('')}>
                  <ModalDialog
                    aria-labelledby="variant-modal-title"
                    aria-describedby="variant-modal-description"
                    variant={open || undefined}
                  >
                    <ModalClose />
                    <Typography
                      id="variant-modal-title"
                      component="h2"
                      level="inherit"
                      fontSize="1.25em"
                      mb="0.25em"
                    >
                      Modal Dialog
                    </Typography>
                    <Typography
                      id="variant-modal-description"
                      textColor="inherit"
                    >
                      This is a `{open}` modal dialog.
                    </Typography>
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
                              props.touched.password &&
                              Boolean(props.errors.password)
                            }
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
                  </ModalDialog>
                </Modal>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Recharge;
