import React, { useState, useRef } from 'react';
import { useGlobalContext } from '../context/appContext';
import { Loading, FormProcessing, AlertRegister } from '../components';
import loginImg from '../assets/images/login.svg';
import defaultImage from '../assets/images/avt/hacker.png';
import { useNavigate } from 'react-router-dom';
// import { Loading } from '../components/index.js';
import axios from 'axios';

import {
  GrFormPrevious,
  GrFormNext,
  GrCaretNext,
  GrCaretPrevious,
} from 'react-icons/gr';

const initState = {
  name: '',
  phone: '',
  email: '',
  address: '',
  birth: null,
  imageFront: '',
  imageBack: '',
};

const Register = () => {
  const {
    isLoading,
    switchPage,
    isErrorForm,
    messageErrorForm,
    typeErrorForm,
    login,
    register,
    uploadImage,
  } = useGlobalContext();

  const [getNext, setNext] = useState(0);
  const [getPercent, setPercent] = useState(0);

  const [values, setValues] = useState(initState);

  const [isValid, setValid] = useState(true);
  const [isLoadingForm, setLoadingForm] = useState(false);

  const navigate = useNavigate();

  // const { isError } = useGlobalContext();
  const handleChangeValue = async (e) => {
    let imageValue;
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];

      console.log(img);

      uploadImage(img, e.target.value);

      setValues({ ...values, [e.target.name]: e.target.value });
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
    // setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleClickPre = (e) => {
    e.preventDefault();
    if (getNext === 0) {
      setNext(0);
      setPercent(0);
    } else {
      setNext(getNext - 1);
      setPercent(getPercent - 20);
    }
  };

  const handleClickNext = (e) => {
    e.preventDefault();
    if (getNext === 6) {
      setNext(6);
      setPercent(100);
    } else {
      setNext(getNext + 1);
      setPercent(getPercent + 20);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Submit success');

    register({
      name: values.name,
      email: values.email,
      phone: values.phone,
      birth: values.birth,
      address: values.address,
      imageFront: values.imageFront,
      imageBack: values.imageBack,
    });

    switchPage();

    setValid(!isValid);
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (!isLoading) {
    return (
      <section className="section-register">
        <div className="register__container-image">
          <img src={loginImg} alt="login image" className="register__img" />
        </div>
        <div className="register__container-content">
          <h1 className="heading--primary register-heading">
            <span className="heading__highlight">Regis</span>ter
          </h1>

          <FormProcessing getPercent={getPercent}></FormProcessing>

          {isValid ? (
            <form
              className={
                getNext === 5 ? 'register-form__images' : 'register-form'
              }
              
              // onSubmit={handleSubmit}
            >
              {getNext === 0 && (
                <div className="form-control form-control__register">
                  <label
                    htmlFor="phone"
                    className="form-label form-label__register"
                  >
                    Phone number
                  </label>

                  <input
                    type="text"
                    className="form-input form-input__register"
                    id="phone"
                    value={values.phone}
                    onChange={handleChangeValue}
                    name="phone"
                  />
                </div>
              )}

              {getNext === 1 && (
                <div className="form-control form-control__register">
                  <label
                    htmlFor="name"
                    className="form-label form-label__register"
                  >
                    Full Name
                  </label>

                  <input
                    type="text"
                    className="form-input form-input__register"
                    id="name"
                    value={values.name}
                    onChange={handleChangeValue}
                    name="name"
                  />
                </div>
              )}
              {getNext === 2 && (
                <div className="form-control form-control__register">
                  <label
                    htmlFor="email"
                    className="form-label form-label__register"
                  >
                    Email
                  </label>

                  <input
                    type="text"
                    className="form-input form-input__register"
                    id="email"
                    value={values.email}
                    onChange={handleChangeValue}
                    name="email"
                  />
                </div>
              )}
              {getNext === 3 && (
                <div className="form-control form-control__register">
                  <label
                    htmlFor="address"
                    className="form-label form-label__register"
                  >
                    Address
                  </label>

                  <input
                    type="text"
                    className="form-input form-input__register"
                    id="address"
                    value={values.address}
                    onChange={handleChangeValue}
                    name="address"
                  />
                </div>
              )}
              {getNext === 4 && (
                <div className="form-control form-control__register">
                  <label
                    htmlFor="birth"
                    className="form-label form-label__register"
                  >
                    Date of birth
                  </label>

                  <input
                    type="date"
                    className="form-input form-input__register"
                    id="birth"
                    value={values.birth}
                    onChange={handleChangeValue}
                    name="birth"
                  />
                </div>
              )}
              {getNext === 5 && (
                <>
                  <div className="form-control__image">
                    <label htmlFor="imageFront" className="form-label">
                      Image front
                    </label>
                    <input
                      type="file"
                      className="form-input"
                      id="imageFront"
                      value={values.imageFront}
                      onChange={handleChangeValue}
                      name="imageFront"
                      accept = "image/*"
                    />

                    <img
                      src={
                        values.imageFront === ''
                          ? defaultImage
                          : values.imageFront
                      }
                      alt="default image"
                    />
                  </div>

                  <div className="form-control__image">
                    <label htmlFor="imageBack" className="form-label">
                      Image back
                    </label>
                    <input
                      type="file"
                      className="form-input"
                      id="imageBack"
                      value={values.imageBack}
                      onChange={handleChangeValue}
                      name="imageBack"
                      accept="image/*"
                    />
                    <img
                      src={
                        values.imageBack === ''
                          ? defaultImage
                          : values.imageBack
                      }
                      alt="default image"
                    />
                  </div>
                </>
              )}

              {getNext === 6 && (
                <div className="form-control">
                  <h2>Click to submit</h2>
                </div>
              )}

              <div className="form-buttons">
                <button
                  className="btn btn-contact btn-register"
                  onClick={handleClickPre}
                  type="button"
                >
                  {getNext === 6 ? (
                    <GrCaretPrevious className="icon-pre"></GrCaretPrevious>
                  ) : (
                    <GrCaretPrevious className="icon-pre"></GrCaretPrevious>
                  )}
                </button>

                {getNext === 6 ? (
                  <button
                    className="btn btn-contact btn-register"
                    onClick={handleSubmit}
                    type="submit"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    className="btn btn-contact btn-register"
                    onClick={handleClickNext}
                    type="button"
                  >
                    <GrCaretNext className="icon-pre"></GrCaretNext>
                  </button>
                )}
              </div>
            </form>
          ) : (
            <AlertRegister
              isError={isErrorForm}
              typeError={typeErrorForm}
              msgError={messageErrorForm}
            ></AlertRegister>
          )}
        </div>
      </section>
    );
  }
};

export default Register;
