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

import { MuiOtpInput } from 'mui-one-time-password-input';

import { FaLinux } from 'react-icons/fa';

import { useGlobalContext } from '../../context/appContext';

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
    description: 'Enter your information',
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
};

const Recharge = () => {
  const [getNext, setNext] = useState(0);

  const [values, setValues] = useState(initState);

  const [activeStep, setActiveStep] = useState(0);

  const [getValidCard, setValidCard] = useState(false);
  const [getValidMoney, setValidMoney] = useState(false);

  const {
    actionBankPage,
    bankPage,
    confirmDigitalCard,
    isConfirmDigitalCard,
    showToast,
  } = useGlobalContext();

  const handleChangeId = (input) => {
    if (input === '123456') {
      setValidCard(true);
    } else {
      setValidCard(false);
    }
    setValues({ ...values, idCard: input });
  };

  const handleChangeCvv = (input) => {
    if (input === '111') {
      setValidCard(true);
    } else {
      setValidCard(false);
    }
    setValues({ ...values, cvv: input });
  };

  const handleChangeMoney = (e) => {
    if (e.target.value % 50000 === 0 && e.target.value !== 0) {
      showToast('💣 OK', 2000, 'success');
      setValidMoney(true);
    } else {
      showToast('💣 Money must devide 50000', 2000, 'error');

      setValidMoney(false);
    }
    setValues({ ...values, money: e.target.value });
  };

  const handleChangeDate = (e) => {
    if (e.target.value === '2022-10-03') {
      setValidCard(true);
    } else {
      setValidCard(false);
    }
    setValues({ ...values, date: e.target.value });
  };

  const handleClick10 = () => {
    showToast('💣 OK', 2000, 'success');

    setValidMoney(true);
    setValues({ ...values, money: 10000 });
  };
  const handleClick20 = () => {
    showToast('💣 OK', 2000, 'success');

    setValidMoney(true);
    setValues({ ...values, money: 20000 });
  };
  const handleClick50 = () => {
    showToast('💣 OK', 2000, 'success');

    setValidMoney(true);
    setValues({ ...values, money: 50000 });
  };
  const handleClick100 = () => {
    showToast('💣 OK', 2000, 'success');

    setValidMoney(true);
    setValues({ ...values, money: 100000 });
  };
  const handleClick200 = () => {
    showToast('💣 OK', 2000, 'success');

    setValidMoney(true);
    setValues({ ...values, money: 200000 });
  };
  const handleClick500 = () => {
    showToast('💣 OK', 2000, 'success');

    setValidMoney(true);
    setValues({ ...values, money: 500000 });
  };

  const handleClickNext = (e) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    actionBankPage({
      numPage: bankPage.numPage,
      name: 'recharge',
      length: 3,
      actionType: 'plus',
      isOK: bankPage.numPage === 1 ? getValidMoney : getValidCard,
    });
  };

  const handleClickBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    actionBankPage({
      numPage: bankPage.numPage,
      name: 'recharge',
      length: 3,
      actionType: 'minus',
      isOK: bankPage.numPage === 1 ? getValidMoney : getValidCard,
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
            {bankPage.numPage === 1 && (
              <h2 className="heading--secondary">Heading here</h2>
            )}
          </div>

          {bankPage.numPage === 1 && (
            <form className="recharge-form recharge-1">
              <Box sx={{ '& .MuiTextField-root': { m: 1, width: '32ch' } }}>
                {/* <CssTextField
                  // label="Amount"
                  id="custom-css-outlined-input"
                  sx={{
                    backgroundColor: '#e9faf5',
                    letterSpacing: 1,
                  }}
                  variant="filled"
                  size="big"
                  onChange={handleChangeMoney}
                  value={values.money}
                /> */}
                <CssTextField
                  id="outlined-number"
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

              <div className="recharge-suggestion">
                <button
                  className="recharge-suggestion__item"
                  onClick={handleClick10}
                  type="button"
                >
                  10000đ
                </button>
                <button
                  className="recharge-suggestion__item"
                  onClick={handleClick20}
                  type="button"
                >
                  20000đ
                </button>
                <button
                  className="recharge-suggestion__item"
                  onClick={handleClick50}
                  type="button"
                >
                  50000đ
                </button>
                <button
                  className="recharge-suggestion__item"
                  onClick={handleClick100}
                  type="button"
                >
                  100000đ
                </button>
                <button
                  className="recharge-suggestion__item"
                  onClick={handleClick200}
                  type="button"
                >
                  200000đ
                </button>
                <button
                  className="recharge-suggestion__item"
                  onClick={handleClick500}
                  type="button"
                >
                  500000đ
                </button>
              </div>

              {/* <div className="recharge-form__control">
                <div className="recharge-form__label--first">
                  <input
                    type="text"
                    className="recharge-form__input"
                    placeholder="Enter amount here"
                  />
                </div>
              </div> */}
            </form>
          )}

          {bankPage.numPage === 2 && (
            <form className="recharge-form recharge-1">
              <div className="recharge-form__control--2">
                <label className="recharge-form__label">ID Card</label>
                <MuiOtpInput
                  value={values.idCard}
                  onChange={handleChangeId}
                  name="idCard"
                  length={6}
                  className="recharge-form__otp"
                />
              </div>
              <div className="recharge-form__control--2">
                <label className="recharge-form__label">CVV</label>
                <MuiOtpInput
                  value={values.cvv}
                  onChange={handleChangeCvv}
                  name="cvv"
                  length={3}
                  className="recharge-form__otp"
                />
              </div>
              <div className="recharge-form__control--2">
                <label className="recharge-form__label">Date</label>
                <input
                  type="date"
                  className="recharge-form__input recharge-form__input--2"
                  value={values.date}
                  name="date"
                  onChange={handleChangeDate}
                />
              </div>
            </form>
          )}

          {bankPage.numPage === 3 && (
            <div className="recharge-result">
              <h2 className="heading--secondary">Success</h2>
            </div>
          )}

          <div className="recharge__group-btns">
            {bankPage.numPage !== 1 && (
              <button
                className="recharge__btn"
                type="button"
                onClick={handleClickBack}
              >
                Back
              </button>
            )}

            <button
              className="recharge__btn"
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

export default Recharge;
