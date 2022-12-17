import React, { useState } from 'react';

import { RiLockPasswordLine } from 'react-icons/ri';
import { BsArrowRightCircle } from 'react-icons/bs';

import { useGlobalContext } from '../context/appContext';

import { Loader2 } from '../components';

import SettingStyled from '../theme/pages/Setting';

import {
  DefaultButton,
  LoginButton,
  Button83,
  ContactButton,
  DownloadButton,
  ButtonAccountEdit,
  MUIButtonCustom02,
} from '../theme/components/Buttons';

import { MUIInputCustom02 } from '../theme/components/Input';

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

import LoadingButton from '@mui/lab/LoadingButton';

import { Formik, Form, Field, ErrorMessage, useFormik, useField } from 'formik';

const SettingPassword = () => {
  const [next, setNext] = useState(false);

  const { isLoader, isLoadingForm, changePassword } = useGlobalContext();

  if (isLoader) {
    return (
      <SettingStyled>
        <div className="section-setting">
          <Loader2></Loader2>;
        </div>
      </SettingStyled>
    );
  }

  return (
    <SettingStyled>
      <div className="section-setting section-setting__password">
        <Formik
          initialValues={{
            password: '',
            newPassword: '',
            newPasswordConfirm: '',
          }}
          // validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            console.log('submit here');
            // actions.setFieldValue('idCard', otp);
            console.log(values);

            changePassword({
              password: values.newPassword,
              confirmPassword: values.newPasswordConfirm,
              oldPassword: values.password,
            });
          }}
        >
          {(props) => (
            <>
              <Form
                onSubmit={props.handleSubmit}
                className="setting-password__form"
              >
                <div className="setting-password__heading">
                  <h3 className="setting-password__heading-text">
                    Change Password
                  </h3>

                  <div className="setting-password__group-btns">
                    <LoadingButton
                      className="align-self__center"

                      // onClick={() => setNext(false)}
                    >
                      Cancel
                    </LoadingButton>
                    <LoadingButton
                      className="align-self__center"
                      type="submit"
                      loading={isLoadingForm}
                    >
                      Save
                    </LoadingButton>
                  </div>
                </div>

                <Box
                  sx={{
                    width: '85%',
                    display: 'grid',
                    gridTemplateRows: 'repeat(3, max-content)',
                    rowGap: '1.6rem',
                  }}
                >
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
                          aria-describedby="component-helper-text"
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
                  <Field name="newPassword">
                    {({ field, form, meta }) => (
                      <FormControl>
                        <MUIInputCustom02
                          {...field}
                          id="newPassword"
                          name="newPassword"
                          label="New password"
                          value={props.values.newPassword}
                          onChange={props.handleChange}
                          error={
                            props.touched.newPassword &&
                            Boolean(props.errors.newPassword)
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
                          {props.touched.newPassword &&
                            props.errors.newPassword}
                        </FormHelperText>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="newPasswordConfirm">
                    {({ field, form, meta }) => (
                      <FormControl>
                        <MUIInputCustom02
                          {...field}
                          id="newPasswordConfirm"
                          name="newPasswordConfirm"
                          label="Confirm new password"
                          value={props.values.newPasswordConfirm}
                          onChange={props.handleChange}
                          error={
                            props.touched.newPasswordConfirm &&
                            Boolean(props.errors.newPasswordConfirm)
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
                          {props.touched.newPasswordConfirm &&
                            props.errors.newPasswordConfirm}
                        </FormHelperText>
                      </FormControl>
                    )}
                  </Field>
                </Box>
              </Form>
            </>
          )}
        </Formik>
      </div>
    </SettingStyled>
  );
};

export default SettingPassword;
