import React from 'react';

import imgFront from '../assets/images/default-iden-front.svg';
import imgBack from '../assets/images/default-iden-back.svg';

import { useGlobalContext } from '../context/appContext';

import { Loader2 } from '../components';

import SettingStyled from '../theme/pages/Setting';

import defaultAvt from '../assets/images/avt/user.png';
import { HeadingPrimary, DefaultParagraph } from '../theme/base/Typography';

// import box material
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
  ImageList,
  ImageListItem,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';

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

// import { Toast } from '../../components';

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

import { Formik, Form, Field, ErrorMessage, useFormik, useField } from 'formik';

const UploadCMD = () => {
  const {
    isLoader,
    user,
    uploadImageCMND,
    isLoadingForm,
    getSingleUser,
    userById,
  } = useGlobalContext();

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
      <div className="section-setting section-setting__upload">
        <Formik
          initialValues={{
            imageFront: new File([], ''),
            imageBack: new File([], ''),
          }}
          onSubmit={(values, actions) => {
            console.log(values);

            uploadImageCMND({
              imageFront: values.imageFront,
              imageBack: values.imageBack,
              idUser: user?._id,
            });

            getSingleUser(user?._id);
          }}
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit}>
              {/* <input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.name}
                name="name"
              />

              {props.errors.name && (
                <div id="feedback">{props.errors.name}</div>
              )}

              <button type="submit">Submit</button> */}

              <div className="setting-upload__container-img">
                <div className="setting-upload__image-front">
                  {/* <img
                    src={user?.imageFront}
                    alt="image"
                    className="setting-upload__image"
                  /> */}

                  <FormControl
                    sx={{
                      display: 'grid',
                      rowGap: '0.8rem',
                      gridTemplateColumns: '1fr 1fr',
                      alignItems: 'center',
                      columnGap: '0.8rem',
                    }}
                  >
                    <MUIButtonCustom04 variant="contained" component="label">
                      Image front
                      <input
                        type="file"
                        hidden
                        id="imageFront"
                        name="imageFront"
                        onChange={(event) => {
                          const files = event.target.files[0];
                          // let myFiles = Array.from(files);
                          props.setFieldValue('imageFront', files);
                        }}
                      />
                    </MUIButtonCustom04>

                    <DefaultParagraph
                      inputSize="1.2rem"
                      className="justify-self__start"
                    >
                      {props.values.imageFront.name}
                    </DefaultParagraph>

                    <ImageList
                      sx={{
                        gridArea: '1 / 2 / 3 / 3',
                        justifySelf: 'end',
                      }}
                    >
                      <ImageListItem
                        sx={{
                          width: 102,
                          height: 102,
                          objectFit: 'cover',
                        }}
                      >
                        <img
                          src={
                            props.values.imageFront.name
                              ? URL.createObjectURL(props.values.imageFront)
                              : user?.imageFront
                          }
                        />
                      </ImageListItem>
                      <ImageListItem
                        sx={{
                          width: 102,
                          height: 102,
                          objectFit: 'cover',
                        }}
                      >
                        <img src={user?.imageFront} alt="cmnd" />
                      </ImageListItem>
                    </ImageList>
                  </FormControl>
                </div>
                <div className="setting-upload__image-back">
                  <FormControl
                    sx={{
                      display: 'grid',
                      rowGap: '0.8rem',
                      gridTemplateColumns: '1fr 1fr',
                      alignItems: 'center',
                      columnGap: '0.8rem',
                    }}
                  >
                    <MUIButtonCustom04 variant="contained" component="label">
                      Image back
                      <input
                        type="file"
                        hidden
                        id="imageBack"
                        name="imageBack"
                        onChange={(event) => {
                          const files = event.target.files[0];
                          // let myFiles = Array.from(files);
                          props.setFieldValue('imageBack', files);
                        }}
                      />
                    </MUIButtonCustom04>

                    <DefaultParagraph
                      inputSize="1.2rem"
                      className="justify-self__start"
                    >
                      {props.values.imageBack.name}
                    </DefaultParagraph>

                    <ImageList
                      sx={{
                        gridArea: '1 / 2 / 3 / 3',
                        justifySelf: 'end',
                      }}
                    >
                      <ImageListItem
                        sx={{
                          width: 102,
                          height: 102,
                          objectFit: 'cover',
                        }}
                      >
                        <img
                          src={
                            props.values.imageBack.name
                              ? URL.createObjectURL(props.values.imageBack)
                              : user?.imageBack
                          }
                        />
                      </ImageListItem>
                      <ImageListItem
                        sx={{
                          width: 102,
                          height: 102,
                          objectFit: 'cover',
                        }}
                      >
                        <img src={user?.imageBack} alt="cmnd" />
                      </ImageListItem>
                    </ImageList>
                  </FormControl>
                </div>
                <LoadingButton
                  loading={isLoadingForm}
                  type="submit"
                  variant="contained"
                  sx={{ position: 'absolute', bottom: '0', right: '0' }}
                >
                  Upload
                </LoadingButton>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </SettingStyled>
  );
};

export default UploadCMD;
