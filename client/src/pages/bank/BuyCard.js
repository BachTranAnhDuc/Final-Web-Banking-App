import React, { useState, useEffect } from 'react';

import { HiOutlinePlusCircle, HiOutlineMinusCircle } from 'react-icons/hi';

import viettelLogo from '../../assets/images/logos/viettel.svg';
import successSvg from '../../assets/images/design/success.svg';

import { useGlobalContext } from '../../context/appContext';

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

import Chip from '@mui/joy/Chip';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Typography from '@mui/joy/Typography';
import ChipDelete from '@mui/joy/ChipDelete';

const initSwitchCard = {
  viettel: true,
  mobile: false,
  vina: false,
};

const initItem = {
  ten: true,
  twenty: false,
  fifty: false,
  hundred: false,
};

const initPwd = {
  pwd: '',
  isShow: false,
  isConfirm: false,
};

const BuyCard = () => {
  const [valuesCard, setValuesCard] = useState(initSwitchCard);

  const [valuesItem, setValuesItem] = useState(initItem);

  const [getAmount, setAmount] = useState(1);

  const [activeStep, setActiveStep] = useState(0);
  const [selectedCardName, setSelectedCardName] = React.useState('');
  const [selectedCardType, setSelectedCardType] = React.useState('');
  const [selectedValue, setSelectedValue] = React.useState('a');
  const [open, setOpen] = React.useState('');

  const {
    showToast,
    isConfirmPwdBuy,
    actionBankPage,
    bankPage,
    confirmPwdBuy,
  } = useGlobalContext();

  const [openModalMUI, setOpenModalMUI] = React.useState(false);

  const [pwdInput, setPwdInput] = useState(initPwd);

  const handleClickOpenModalMUI = () => {
    setOpenModalMUI(true);
  };

  const handleCloseModalMUI = () => {
    setOpenModalMUI(false);
  };

  const resetSwitchCard = () => {
    setValuesCard({ viettel: false, mobile: false, vina: false });
  };

  const handleSwitchViettel = (e) => {
    console.log(e.target.name);

    setValuesCard({ mobile: false, vina: false, [e.target.name]: true });
  };
  const handleSwitchMobile = (e) => {
    console.log(e.target.name);

    setValuesCard({ viettel: false, vina: false, [e.target.name]: true });
  };
  const handleSwitchVina = (e) => {
    console.log(e.target.name);

    setValuesCard({ viettel: false, mobile: false, [e.target.name]: true });
  };

  const handleClick10 = () => {
    setValuesItem({ ten: true, twenty: false, fifty: false, hundred: false });
  };
  const handleClick20 = () => {
    setValuesItem({ ten: false, twenty: true, fifty: false, hundred: false });
  };
  const handleClick50 = () => {
    setValuesItem({ ten: false, twenty: false, fifty: true, hundred: false });
  };
  const handleClick100 = () => {
    setValuesItem({ ten: false, twenty: false, fifty: false, hundred: true });
  };

  const handleCheckPlus = () => {
    if (getAmount === 5) {
      showToast('💣 Amount must not more than 5', 2000, 'error');
    }
  };
  const handleCheckMinus = () => {
    if (getAmount === 1) {
      showToast('💣 Amount must not less than 1', 2000, 'error');
    }
  };

  const handleClickNext = (e) => {
    actionBankPage({
      numPage: bankPage.numPage,
      name: 'buy-card',
      length: 3,
      actionType: 'plus',
      isOK: true,
    });
  };
  const handleClickBack = (e) => {
    actionBankPage({
      numPage: bankPage.numPage,
      name: 'buy-card',
      length: 3,
      actionType: 'minus',
      isOK: true,
    });
  };

  return (
    <div className="bank-body__buy-card">
      <div className="buy-card__header">
        <h2 className="buy-card__header--heading">Buy card</h2>
      </div>
      <div className="buy-card__body">
        <Formik
          initialValues={{
            nameCard: '',
            typeCard: '',
            numberCard: '1',
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
            <Form onSubmit={props.handleSubmit} className="buy-card__form">
              {bankPage.numPage === 1 && (
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'grid',
                    gridTemplateRows: '1fr 1fr max-content',
                    rowGap: '1.6rem',
                    // padding: '1.6rem 3.2rem',
                  }}
                >
                  <Box sx={{ display: 'grid' }}>
                    <RadioGroup
                      name="nameCard"
                      aria-labelledby="best-movie"
                      row
                      sx={{
                        // padding: '2.4rem 2.4rem',
                        justifySelf: 'center',
                        alignSelf: 'center',
                        flexWrap: 'wrap',
                        gap: 2,
                        // backgroundColor: 'red',
                      }}
                    >
                      {['Viettel', 'MobiFone', 'VinaPhone'].map((name) => {
                        const checked = selectedCardName === name;
                        return (
                          <Chip
                            key={name}
                            variant={checked ? 'soft' : 'plain'}
                            color={checked ? 'primary' : 'neutral'}
                            // endDecorator={checked && <ChipDelete />}
                            sx={{ padding: '1.6rem 3.2rem' }}
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
                                  setSelectedCardName(name);
                                  props.setFieldValue('nameCard', name);
                                  // props.handleChange();
                                }
                              }}
                            />
                          </Chip>
                        );
                      })}
                    </RadioGroup>
                  </Box>
                  <Box
                    sx={{
                      // backgroundColor: 'blue',
                      display: 'grid',
                      justifyItems: 'center',
                      alignItems: 'start',
                    }}
                  >
                    <RadioGroup
                      name="typeCard"
                      aria-labelledby="best-movie"
                      row
                      sx={{
                        flexWrap: 'wrap',
                        gap: 1,
                        // backgroundColor: 'orange',
                      }}
                    >
                      {['10,000d', '20,000d', '50,000d', '100,000d'].map(
                        (name) => {
                          const checked = selectedCardType === name;
                          return (
                            <Chip
                              key={name}
                              variant={checked ? 'soft' : 'plain'}
                              color={checked ? 'primary' : 'neutral'}
                              sx={{ padding: '1.2rem 2.4rem' }}
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
                                    setSelectedCardType(name);
                                    props.setFieldValue('typeCard', name);
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

                  <div className="buy-card__item-number">
                    <div className="buy-card__item-number--left">
                      <span className="buy-card__item--text">Number</span>
                      <button
                        className="btn__buy-card--action"
                        type="button"
                        onClick={() => {
                          let re;

                          if (Number(props.values.numberCard) <= 1) {
                            props.setFieldValue('numberCard', '1');
                            showToast(
                              'Number of card must at least 1 item',
                              2000,
                              'error'
                            );
                          } else {
                            props.setFieldValue(
                              'numberCard',
                              `${Number(props.values.numberCard) - 1}`
                            );
                          }
                        }}
                      >
                        <HiOutlineMinusCircle className="buy-card__icon"></HiOutlineMinusCircle>
                      </button>
                      <span className="buy-card__item--span">
                        {props.values.numberCard}
                      </span>
                      <button
                        className="btn__buy-card--action"
                        type="button"
                        onClick={() => {
                          let re;

                          if (Number(props.values.numberCard) >= 5) {
                            props.setFieldValue('numberCard', '5');
                            showToast(
                              'Number of card must not more than 5',
                              2000,
                              'error'
                            );
                          } else {
                            props.setFieldValue(
                              'numberCard',
                              `${Number(props.values.numberCard) + 1}`
                            );
                          }
                        }}
                      >
                        <HiOutlinePlusCircle className="buy-card__icon"></HiOutlinePlusCircle>
                      </button>
                    </div>
                  </div>
                </Box>
              )}
              {bankPage.numPage == 2 && (
                <div className="buy-card__shop--body-infor">
                  <div className="buy-card__shop--header">
                    <h2 className="buy-card__shop--heading">Infomation</h2>
                  </div>
                  <div className="buy-card__shop--body">
                    <div className="buy-card__shop--body__content">
                      <div className="buy-card__shop--body__content--left">
                        <img
                          src={viettelLogo}
                          alt="logo"
                          className="buy-card__shop--body__content--img"
                        />
                      </div>
                      <div className="buy-card__shop--body__content--right">
                        <div className="buy-card__shop--body__content-control">
                          <h2 className="buy-card__shop--body__content-heading">
                            Type
                          </h2>
                          <span className="buy-card__shop--body__content-span">
                            Viettel
                          </span>
                        </div>
                        <div className="buy-card__shop--body__content-control">
                          <h2 className="buy-card__shop--body__content-heading">
                            Value
                          </h2>
                          <span className="buy-card__shop--body__content-span">
                            100000vnd
                          </span>
                        </div>
                        <div className="buy-card__shop--body__content-control">
                          <h2 className="buy-card__shop--body__content-heading">
                            Amount
                          </h2>
                          <span className="buy-card__shop--body__content-span">
                            4
                          </span>
                        </div>
                        <div className="buy-card__shop--body__content-control">
                          <h2 className="buy-card__shop--body__content-heading">
                            Total
                          </h2>
                          <span className="buy-card__shop--body__content-span">
                            400000vnd
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {bankPage.numPage === 3 && (
                <Box sx={{ height: '100%' }}>
                  <h2 className="heading--secondary">buy-card success</h2>
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
                        if (selectedCardName && selectedCardType) {
                          handleClickNext(true);
                        } else {
                          showToast(
                            'Please choose name and type card',
                            4000,
                            'error'
                          );
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
              <Modal
                open={!!open}
                onClose={() => setOpen('')}
                // sx={{ width: '20rem' }}
              >
                <ModalDialog
                  aria-labelledby="variant-modal-title"
                  aria-describedby="variant-modal-description"
                  variant={open || undefined}
                  sx={{
                    width: '40rem',
                    height: '24rem',
                    padding: '3.2rem 4.4rem',
                    display: 'grid',
                    gridTemplateRows: 'repeat(max-content) min-content',
                    gap: '1.6rem 0',
                  }}
                >
                  <ModalClose />
                  <Typography
                    id="variant-modal-title"
                    component="h2"
                    level="inherit"
                    fontSize="1.6rem"
                    mb="0.25em"
                  >
                    Modal Dialog
                  </Typography>
                  {/* <Typography
                      id="variant-modal-description"
                      textColor="inherit"
                    >
                      This is a `{open}` modal dialog.
                    </Typography> */}
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

                  <MUIButtonCustom02 type="button">Confirm</MUIButtonCustom02>
                </ModalDialog>
              </Modal>
            </Form>
          )}
        </Formik>
        {/* {bankPage.numPage === 1 && (
          <>
            <div className="buy-card__body--top">
              <div className="buy-card__list">
                <button
                  // className="buy-card__item-card buy-card__item-card--viettel"
                  className={
                    valuesCard.viettel
                      ? 'buy-card__item-card buy-card__item-card--viettel buy-card__item-card--viettel-active'
                      : 'buy-card__item-card buy-card__item-card--viettel'
                  }
                  onClick={handleSwitchViettel}
                  name="viettel"
                >
                  Viettel
                </button>
                <button
                  className={
                    valuesCard.mobile
                      ? 'buy-card__item-card buy-card__item-card--mobile buy-card__item-card--mobile-active'
                      : 'buy-card__item-card buy-card__item-card--mobile'
                  }
                  onClick={handleSwitchMobile}
                  name="mobile"
                >
                  Mobilephone
                </button>
                <button
                  className={
                    valuesCard.vina
                      ? 'buy-card__item-card buy-card__item-card--vinaphone buy-card__item-card--vinaphone-active'
                      : 'buy-card__item-card buy-card__item-card--vinaphone'
                  }
                  onClick={handleSwitchVina}
                  name="vina"
                >
                  Vinaphone
                </button>
              </div>
            </div>
            <div className="buy-card__body--bottom">
              <div className="buy-card__list--items">
                <button
                  className={
                    valuesCard.mobile
                      ? `buy-card__item-value buy-card__item--mobile buy-card__item--mobile--active ${
                          valuesItem.ten && 'buy-card__item--mobile-active'
                        }`
                      : valuesCard.vina
                      ? `buy-card__item-value buy-card__item--vinaphone buy-card__item--vinaphone--active ${
                          valuesItem.ten && 'buy-card__item--vinaphone-active'
                        }`
                      : `buy-card__item-value buy-card__item--viettel buy-card__item--viettel--active ${
                          valuesItem.ten && 'buy-card__item--viettel-active'
                        }`
                  }
                  onClick={handleClick10}
                >
                  10000vnd
                </button>
                <button
                  className={
                    valuesCard.mobile
                      ? `buy-card__item-value buy-card__item--mobile buy-card__item--mobile--active ${
                          valuesItem.twenty && 'buy-card__item--mobile-active'
                        }`
                      : valuesCard.vina
                      ? `buy-card__item-value buy-card__item--vinaphone buy-card__item--vinaphone--active ${
                          valuesItem.twenty &&
                          'buy-card__item--vinaphone-active'
                        }`
                      : `buy-card__item-value buy-card__item--viettel buy-card__item--viettel--active ${
                          valuesItem.twenty && 'buy-card__item--viettel-active'
                        }`
                  }
                  onClick={handleClick20}
                >
                  20000vnd
                </button>
                <button
                  className={
                    valuesCard.mobile
                      ? `buy-card__item-value buy-card__item--mobile buy-card__item--mobile--active ${
                          valuesItem.fifty && 'buy-card__item--mobile-active'
                        }`
                      : valuesCard.vina
                      ? `buy-card__item-value buy-card__item--vinaphone buy-card__item--vinaphone--active ${
                          valuesItem.fifty && 'buy-card__item--vinaphone-active'
                        }`
                      : `buy-card__item-value buy-card__item--viettel buy-card__item--viettel--active ${
                          valuesItem.fifty && 'buy-card__item--viettel-active'
                        }`
                  }
                  onClick={handleClick50}
                >
                  50000vnd
                </button>
                <button
                  className={
                    valuesCard.mobile
                      ? `buy-card__item-value buy-card__item--mobile buy-card__item--mobile--active ${
                          valuesItem.hundred && 'buy-card__item--mobile-active'
                        }`
                      : valuesCard.vina
                      ? `buy-card__item-value buy-card__item--vinaphone buy-card__item--vinaphone--active ${
                          valuesItem.hundred &&
                          'buy-card__item--vinaphone-active'
                        }`
                      : `buy-card__item-value buy-card__item--viettel buy-card__item--viettel--active ${
                          valuesItem.hundred && 'buy-card__item--viettel-active'
                        }`
                  }
                  onClick={handleClick100}
                >
                  100000vnd
                </button>
              </div>

              <div className="buy-card__item-number">
                <div className="buy-card__item-number--left">
                  <span className="buy-card__item--text">Number</span>
                  <button
                    className="btn__buy-card--action"
                    type="button"
                    onClick={handleClickMinus}
                  >
                    <HiOutlineMinusCircle className="buy-card__icon"></HiOutlineMinusCircle>
                  </button>
                  <span className="buy-card__item--span">{getAmount}</span>
                  <button
                    className="btn__buy-card--action"
                    type="button"
                    onClick={handleClickPlus}
                  >
                    <HiOutlinePlusCircle className="buy-card__icon"></HiOutlinePlusCircle>
                  </button>
                </div>
                <div className="buy-card__item-number--right">
                  <div className="buy-card__group-btns">
                    <button
                      className="buy-card__btn"
                      type="button"
                      onClick={handleClickPrePage}
                    >
                      Back
                    </button>
                    <button
                      className="buy-card__btn"
                      type="button"
                      onClick={handleClickNextPage}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {bankPage.numPage === 2 && (
          <>
            <div className="buy-card__shop--body-infor">
              <div className="buy-card__shop--header">
                <h2 className="buy-card__shop--heading">Infomation</h2>
              </div>
              <div className="buy-card__shop--body">
                <div className="buy-card__shop--body__content">
                  <div className="buy-card__shop--body__content--left">
                    <img
                      src={viettelLogo}
                      alt="logo"
                      className="buy-card__shop--body__content--img"
                    />
                  </div>
                  <div className="buy-card__shop--body__content--right">
                    <div className="buy-card__shop--body__content-control">
                      <h2 className="buy-card__shop--body__content-heading">
                        Type
                      </h2>
                      <span className="buy-card__shop--body__content-span">
                        Viettel
                      </span>
                    </div>
                    <div className="buy-card__shop--body__content-control">
                      <h2 className="buy-card__shop--body__content-heading">
                        Value
                      </h2>
                      <span className="buy-card__shop--body__content-span">
                        100000vnd
                      </span>
                    </div>
                    <div className="buy-card__shop--body__content-control">
                      <h2 className="buy-card__shop--body__content-heading">
                        Amount
                      </h2>
                      <span className="buy-card__shop--body__content-span">
                        4
                      </span>
                    </div>
                    <div className="buy-card__shop--body__content-control">
                      <h2 className="buy-card__shop--body__content-heading">
                        Total
                      </h2>
                      <span className="buy-card__shop--body__content-span">
                        400000vnd
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="buy-card__shop--footer">
              <div className="buy-card__shop--footer-btns">
                <button
                  className="buy-card__shop--footer-btn"
                  type="button"
                  onClick={handleClickPrePage}
                >
                  Back
                </button>
                <button
                  className="buy-card__shop--footer-btn"
                  type="button"
                  onClick={handleClickOpenModalMUI}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}

        {bankPage.numPage === 3 && (
          <>
            <div className="buy-card__result">
              <div className="buy-card__result--header">
                <h2 className="buy-card__result--header__heading">Info</h2>
              </div>

              <div className="buy-card__result--body">
                <div className="buy-card__result--body-left">
                  <img
                    className="buy-card__result--body-left__img"
                    src={successSvg}
                    alt="success"
                  ></img>
                </div>
                <div className="buy-card__result--body-right">
                  <div className="buy-card__result--body-right__control">
                    <h2 className="buy-card__result--body-right__heading">
                      Seri
                    </h2>
                    <span className="buy-card__result--body-right__span">
                      123456789
                    </span>
                  </div>
                </div>
                <div className="buy-card__result--body-right"></div>
              </div>
            </div>

            <div className="buy-card__result--footer">
              <div className="buy-card__result--footer-btns">
                <button
                  className="buy-card__result--footer-btn"
                  type="button"
                  onClick={handleClickPrePage}
                >
                  Back
                </button>
                <button
                  className="buy-card__result--footer-btn"
                  type="button"
                  onClick={handleClickNextPage}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )} */}
      </div>

      {/* <DialogMUIPwd
        open={openModalMUI}
        handleClose={handleCloseModalMUI}
        namePage={'buy-card'}
        lengthPage={3}
        // values={pwdInput}
        // handleChangePwd={handleChangePwd}
        // handleClickShowPassword={handleClickShowPassword}
        // handleMouseDownPassword={handleMouseDownPassword}
      ></DialogMUIPwd> */}
    </div>
  );
};

export default BuyCard;
