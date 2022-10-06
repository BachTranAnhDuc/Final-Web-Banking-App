import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { pink } from '@mui/material/colors';
import Radio from '@mui/material/Radio';

import { MuiOtpInput } from 'mui-one-time-password-input';

import { FaLinux, FaGithub } from 'react-icons/fa';

// import { SteppBank } from '../../components';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#c2edc2',
    fontSize: 14,
  },
  '& label': {
    fontSize: 16,
    color: '#388078',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#388078',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#20c997',
      border: '2px solid #388078',
      fontSize: 16,
    },
    '&:hover fieldset': {
      borderColor: '#388078',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#c2edc2',
    },
  },
  '& .MuiInputBase-input': {
    fontSize: 16,
    letterSpacing: 1.6,
  },
});

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
  money: 0,
  idCard: '',
  cvv: '',
  date: '',
  fee: 'me',
};

const Transfer = () => {
  const [getNext, setNext] = useState(0);

  const [values, setValues] = useState(initState);

  const [activeStep, setActiveStep] = useState(0);

  const handleChangeId = (input) => {
    setValues({ ...values, idCard: input });
  };

  const handleChangeCvv = (input) => {
    setValues({ ...values, cvv: input });
  };

  const handleChangeMoney = (e) => {
    setValues({ ...values, money: e.target.value });
  };

  const handleChangeDate = (e) => {
    setValues({ ...values, date: e.target.value });
  };

  const handleClick10 = () => {
    setValues({ ...values, money: 10000 });
  };
  const handleClick20 = () => {
    setValues({ ...values, money: 20000 });
  };
  const handleClick50 = () => {
    setValues({ ...values, money: 50000 });
  };
  const handleClick100 = () => {
    setValues({ ...values, money: 100000 });
  };
  const handleClick200 = () => {
    setValues({ ...values, money: 200000 });
  };
  const handleClick500 = () => {
    setValues({ ...values, money: 500000 });
  };

  const handleClickNext = (e) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (getNext === 4) {
      setNext(4);
    } else {
      setNext(getNext + 1);
    }
  };

  const handleClickBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if (getNext === 0) {
      setNext(0);
    } else {
      setNext(getNext - 1);
    }
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
        <div className="transfer-body__right">
          {getNext === 0 && (
            <div className="transfer-body__right--header">
              <h2 className="heading--secondary">Heading here</h2>
            </div>
          )}

          {getNext === 0 && (
            <form className="transfer-form transfer-1">
              <Box sx={{ '& .MuiTextField-root': { m: 1, width: '32ch' } }}>
                <CssTextField
                  id="outlined-number-size-normal"
                  label="Number"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    // backgroundColor: '#e9faf5',
                    letterSpacing: 1,
                  }}
                  onChange={handleChangeMoney}
                  value={values.money}
                />
              </Box>

              <div className="transfer-suggestion">
                <button
                  className="transfer-suggestion__item"
                  onClick={handleClick10}
                  type="button"
                >
                  10000đ
                </button>
                <button
                  className="transfer-suggestion__item"
                  onClick={handleClick20}
                  type="button"
                >
                  20000đ
                </button>
                <button
                  className="transfer-suggestion__item"
                  onClick={handleClick50}
                  type="button"
                >
                  50000đ
                </button>
                <button
                  className="transfer-suggestion__item"
                  onClick={handleClick100}
                  type="button"
                >
                  100000đ
                </button>
                <button
                  className="transfer-suggestion__item"
                  onClick={handleClick200}
                  type="button"
                >
                  200000đ
                </button>
                <button
                  className="transfer-suggestion__item"
                  onClick={handleClick500}
                  type="button"
                >
                  500000đ
                </button>
              </div>

              <div className="transfer-notes">
                <textarea
                  name="note"
                  id="note"
                  cols="24"
                  rows="4"
                  className="transfer-note"
                  placeholder="Note here..."
                ></textarea>
              </div>

              {/* <div className="transfer-form__control">
                <div className="transfer-form__label--first">
                  <input
                    type="text"
                    className="transfer-form__input"
                    placeholder="Enter amount here"
                  />
                </div>
              </div> */}
            </form>
          )}

          {getNext === 1 && (
            <>
              <div className="transfer-information__header">
                <h2 className="transfer-information__heading">Phone Number</h2>
              </div>
              <div className="transfer-form transfer-1">
                <div className="transfer-form__control--2">
                  <label htmlFor="phone" className="transfer-form__label">
                    Phone
                  </label>
                  <input
                    type="text"
                    className="transfer-form__input"
                    id="phone"
                    name="phone"
                  />
                </div>
              </div>
            </>
          )}

          {getNext === 2 && (
            <>
              <div className="transfer-information__header">
                <h2 className="transfer-information__heading">Information</h2>
              </div>
              <div className="transfer-information__body">
                <div className="transfer-information__control">
                  <FaGithub></FaGithub>
                  <h3 className="transfer-information__heading">Name</h3>

                  <p className="transfer-information__text">
                    Bach Tran Anh Duc
                  </p>
                </div>
                <div className="transfer-information__control">
                  <FaGithub></FaGithub>
                  <h3 className="transfer-information__heading">Phone</h3>

                  <p className="transfer-information__text">88888888</p>
                </div>
                <div className="transfer-information__control">
                  <FaGithub></FaGithub>
                  <h3 className="transfer-information__heading">Money</h3>

                  <p className="transfer-information__text">1000000vnd</p>
                </div>
                <div className="transfer-information__control">
                  <FaGithub></FaGithub>
                  <h3 className="transfer-information__heading">Fee</h3>

                  <div className="transfer-information__radios">
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={values.fee}
                      onChange={handleChange}
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        columnGap: 2,
                      }}
                    >
                      <FormControlLabel
                        value="me"
                        control={
                          <Radio
                            sx={{
                              color: pink[800],
                              '&.Mui-checked': {
                                color: pink[600],
                              },
                              '& .MuiSvgIcon-root': {
                                fontSize: 24,
                              },
                            }}
                          />
                        }
                        label="Me"
                      />
                      <FormControlLabel
                        value="friend"
                        control={
                          <Radio
                            sx={{
                              color: pink[800],
                              '&.Mui-checked': {
                                color: pink[600],
                              },
                              '& .MuiSvgIcon-root': {
                                fontSize: 24,
                              },
                            }}
                          />
                        }
                        label="Friend"
                      />
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </>
          )}

          {getNext === 3 && (
            <>
              <div className="transfer-information__header">
                <h2 className="transfer-information__heading">OTP</h2>
              </div>
              <div className="transfer-form transfer-2">
                <div className="transfer-form__control--2">
                  <MuiOtpInput
                    value={values.idCard}
                    onChange={handleChangeId}
                    name="idCard"
                    length={6}
                    className="transfer-form__otp"
                  />
                </div>
              </div>
            </>
          )}

          {getNext === 4 && (
            <>
              <div className="transfer-result__header">
                <h2 className="heading--secondary">Success</h2>
              </div>
              <div className="transfer-result__body">
                <p className="transfer-result__text">Text here</p>
              </div>
            </>
          )}

          <div className="transfer__group-btns">
            {getNext !== 0 && (
              <button
                className="transfer__btn"
                type="button"
                onClick={handleClickBack}
              >
                Back
              </button>
            )}

            <button
              className="transfer__btn"
              type="button"
              onClick={handleClickNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
