import React, { useState, useRef } from 'react';
import { useGlobalContext } from '../context/appContext';
import { Loading, FormProcessing } from '../components';
import loginImg from '../assets/images/login.svg';
import defaultImage from '../assets/images/avt/hacker.png';

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
  const { isLoading } = useGlobalContext();

  const [getNext, setNext] = useState(0);
  const [getPercent, setPercent] = useState(0);

  const [values, setValues] = useState(initState);

  const handleChangeValue = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });

    console.log(values);
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

    console.log(typeof defaultImage);
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

          <form className="register-form">
            {getNext === 0 && (
              <div className="form-control">
                <label htmlFor="phone" className="form-label">
                  Phone number
                </label>
                <input
                  type="text"
                  className="form-input"
                  id="phone"
                  value={values.phone}
                  onChange={handleChangeValue}
                  name="phone"
                />
              </div>
            )}

            {getNext === 1 && (
              <div className="form-control">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-input"
                  id="name"
                  value={values.name}
                  onChange={handleChangeValue}
                  name="name"
                />
              </div>
            )}
            {getNext === 2 && (
              <div className="form-control">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  className="form-input"
                  id="email"
                  value={values.email}
                  onChange={handleChangeValue}
                  name="email"
                />
              </div>
            )}
            {getNext === 3 && (
              <div className="form-control">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-input"
                  id="address"
                  value={values.address}
                  onChange={handleChangeValue}
                  name="address"
                />
              </div>
            )}
            {getNext === 4 && (
              <div className="form-control">
                <label htmlFor="birth" className="form-label">
                  Date of birth
                </label>
                <input
                  type="date"
                  className="form-input"
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
                  <label htmlFor="image1" className="form-label">
                    Image front
                  </label>
                  <input
                    type="file"
                    className="form-input"
                    id="image1"
                    value={values.imageFront}
                    onChange={handleChangeValue}
                    name="imageFront"
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
                  <label htmlFor="image2" className="form-label">
                    Image back
                  </label>
                  <input
                    type="file"
                    className="form-input"
                    id="image2"
                    value={values.imageBack}
                    onChange={handleChangeValue}
                    name="imageBack"
                  />
                  <img
                    src={
                      values.imageBack === '' ? defaultImage : values.imageBack
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
              >
                {getNext === 6 ? (
                  <GrCaretPrevious className="icon-pre"></GrCaretPrevious>
                ) : (
                  <GrCaretPrevious className="icon-pre"></GrCaretPrevious>
                )}
              </button>

              <button
                className="btn btn-contact btn-register"
                onClick={handleClickNext}
              >
                {getNext === 6 ? (
                  'Submit'
                ) : (
                  <GrCaretNext className="icon-pre"></GrCaretNext>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  }
};

export default Register;
