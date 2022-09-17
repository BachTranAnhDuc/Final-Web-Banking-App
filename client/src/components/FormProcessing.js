import React from 'react';
import 'react-step-progress-bar/styles.css';
import { ProgressBar, Step } from 'react-step-progress-bar';

const FormProcessing = ({ getPercent }) => {
  return (
    <ProgressBar
      percent={getPercent}
      filledBackground="linear-gradient(to right, #90e4cb, #168d6a)"
    >
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? 'accomplished' : null}`}
          >
            {index}
          </div>
        )}
      </Step>

      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? 'accomplished' : null}`}
          >
            {index + 1}
          </div>
        )}
      </Step>

      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? 'accomplished' : null}`}
          >
            {index + 1}
          </div>
        )}
      </Step>

      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? 'accomplished' : null}`}
          >
            {index + 1}
          </div>
        )}
      </Step>

      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? 'accomplished' : null}`}
          >
            {index + 1}
          </div>
        )}
      </Step>

      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? 'accomplished' : null}`}
          >
            {index + 1}
          </div>
        )}
      </Step>

      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? 'accomplished' : null}`}
          >
            {index + 1}
          </div>
        )}
      </Step>
    </ProgressBar>
  );
};

export default FormProcessing;
