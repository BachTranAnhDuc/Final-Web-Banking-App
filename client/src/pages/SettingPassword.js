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

import { Formik, Form, Field, ErrorMessage, useFormik, useField } from 'formik';

const SettingPassword = () => {
  const [next, setNext] = useState(false);

  const { isLoader } = useGlobalContext();

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
          }}
          // validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            console.log('submit here');
            // actions.setFieldValue('idCard', otp);
            console.log(values);
          }}
        >
          {(props) => (
            <>
              <div className="setting-password__heading">
                <h3 className="setting-password__heading-text">
                  Change Password
                </h3>

                <div className="setting-password__group-btns">
                  <ButtonAccountEdit
                    className="align-self__center"
                    type="button"
                    onClick={() => setNext(false)}
                  >
                    Cancel
                  </ButtonAccountEdit>
                  <ButtonAccountEdit
                    className="align-self__center"
                    type="button"
                  >
                    Save
                  </ButtonAccountEdit>
                </div>
              </div>

              <Form
                onSubmit={props.handleSubmit}
                className="setting-password__form"
              >
                <Box
                  sx={{
                    width: '85%',
                    display: 'grid',
                    gridTemplateRows: 'repeat(3, max-content)',
                    rowGap: '1.6rem',
                  }}
                >
                  <Field name="money">
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
