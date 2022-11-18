import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';

import { Formik, Form, Field, ErrorMessage, useFormik, useField } from 'formik';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
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
import Typography from '@mui/material/Typography';
// import Chip from '@mui/material/Chip';
import ButtonGroup from '@mui/material/ButtonGroup';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import OpenInNew from '@mui/icons-material/OpenInNew';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import TabPanel from '@mui/joy/TabPanel';
import Divider from '@mui/joy/Divider';
import { DefaultParagraph } from '../theme/base/Typography';
import { HeadingPrimary } from '../theme/base/Typography';
import { Descriptions } from 'antd';

import { Loader2 } from '../components';

import styled from 'styled-components';

import { useGlobalContext } from '../context/appContext';

import SettingStyled from '../theme/pages/Setting';

import {
  DefaultButton,
  LoginButton,
  Button83,
  ContactButton,
  DownloadButton,
  ButtonAccountEdit,
} from '../theme/components/Buttons';

import {
  MUIInputCustom01,
  MUIInputCustom02,
  MUIFileInputStyled,
  MUIFileInputCustom,
} from '../theme/components/Input';

const initGridButton = {
  jus: 'start',
  align: 'center',
};

const Setting = () => {
  const { switchSetting, isLoader, user } = useGlobalContext();

  const { name, email, phone, birth } = user;

  const initState = {
    name: name,
    email: email,
    phone: phone,
    birth: birth,
  };

  const [values, setValues] = useState(initState);

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
      <div className="section-setting setting-all">
        <Formik
          initialValues={{
            money: '',
            note: '',
            otp: '',
            fee: 'me',
            phone: '',
          }}
          // validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            console.log('submit here');
            // actions.setFieldValue('idCard', otp);
            console.log(values);
          }}
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit} className="setting-form">
              <Box>
                <ButtonGroup
                  disableElevation
                  variant="contained"
                  aria-label="Disabled elevation buttons"
                  sx={{ justifySelf: 'end', alignSelf: 'end', gap: '1.2rem' }}
                >
                  <Button
                    onClick={() => {
                      console.log('Save');
                    }}
                  >
                    Save
                  </Button>

                  <Button
                    onClick={() => {
                      console.log('Cancel');
                    }}
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              </Box>
              <Box
                sx={{
                  width: '85%',
                  display: 'grid',
                  gridTemplateRows: 'max-content',
                  rowGap: '1.6rem',
                }}
              >
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
                          props.touched.phone && Boolean(props.errors.phone)
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
            </Form>
          )}
        </Formik>
        {/* <form className="setting-form">
          <div className="setting-heading__content">
            <div className="setting-heading__context">
              <h3 className="heading--tertiary setting-form__heading">
                Personal info
              </h3>
              <p className="setting-heading__text setting-heading__text--small">
                Update your photo and personal details here
              </p>
            </div>

            <div className="setting-heading__buttons">
              <ButtonAccountEdit className="align-self__center" type="button">
                Cancel
              </ButtonAccountEdit>
              <ButtonAccountEdit className="align-self__center" type="button">
                Save
              </ButtonAccountEdit>
            </div>
          </div>

          <div
            className="form-control
        form-control__setting"
          >
            <label htmlFor="name" className="form-label setting-form__label">
              <span>Name</span>
            </label>
            <input
              type="text"
              className="setting-form__input"
              name="name"
              id="name"
              value={values.name}
            />
            <div className="setting__icon-container">
              <HiOutlineUser className="setting__icon"></HiOutlineUser>
            </div>
          </div>

          <div
            className="form-control
        form-control__setting"
          >
            <label htmlFor="email" className="form-label setting-form__label">
              <span>Email</span>
            </label>
            <input
              type="email"
              className="setting-form__input"
              name="email"
              id="email"
              value={values.email}
            />
            <div className="setting__icon-container">
              <AiOutlineMail className="setting__icon"></AiOutlineMail>
            </div>
          </div>

          <div
            className="form-control
          form-control__setting"
          >
            <label htmlFor="birth" className="form-label setting-form__label">
              <span>Phone</span>
            </label>
            <input
              type="text"
              className="setting-form__input"
              name="phone"
              id="phone"
              value={values.phone}
            />
            <div className="setting__icon-container">
              <FaPhone className="setting__icon"></FaPhone>
            </div>
          </div>

          <div
            className="form-control
          form-control__setting"
          >
            <label htmlFor="birth" className="form-label setting-form__label">
              <span>Birth</span>
            </label>
            <input
              type="date"
              className="setting-form__input"
              name="birth"
              id="birth"
              value={values.birth}
            />
            <div className="setting__icon-container">
              <BsCalendar2Date className="setting__icon"></BsCalendar2Date>
            </div>
          </div>
        </form> */}
      </div>
    </SettingStyled>
  );
};

export default Setting;
