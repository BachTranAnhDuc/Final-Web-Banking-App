import styled from 'styled-components';

const DefaultButton = styled.button.attrs((/* props */) => ({ tabIndex: 0 }))`
  font-size: 1.8rem;
  font-weight: 700;

  letter-spacing: 0.2rem;

  border: none;

  display: inline-block;
  padding: 1.6rem 3.2rem;

  border-radius: 10rem;

  background-color: var(--color-primary);
  color: var(--color-white);

  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    background-color: var(--color-primary-dark-2);
  }
`;

const LoginButton = styled(DefaultButton)`
  align-self: center;
`;

const ContactButton = styled(DefaultButton).attrs(() => ({ tabIndex: 0 }))`
  appearance: none;
  background-color: transparent;
  border: 2px solid #1a1a1a;
  border-radius: 15px;
  box-sizing: border-box;
  color: #3b3b3b;
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  min-height: 60px;
  min-width: 0;
  outline: none;
  padding: 16px 24px;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 100%;
  will-change: transform;

  &:hover {
    color: #fff;
    background-color: var(--color-primary-light-6);
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
  }

  &:disabled {
    pointer-events: none;
  }

  &:active {
    box-shadow: none;
    transform: translateY(0);
  }

  &.btn-register {
    align-self: center;
    justify-self: end;
  }
`;

const Button83 = styled.button.attrs(() => ({ tabIndex: 0 }))`
  appearance: button;
  background-color: transparent;
  background-image: linear-gradient(
    to bottom,
    #fff,
    var(--color-primary-light-9)
  );
  border: 0 solid #e5e7eb;
  border-radius: 0.5rem;
  box-sizing: border-box;
  color: #482307;
  column-gap: 1rem;
  cursor: pointer;
  display: flex;
  font-family: ui-sans-serif, system-ui, -apple-system, system-ui, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  font-size: 100%;
  font-weight: 700;
  line-height: 24px;
  margin: 0;
  outline: 2px solid transparent;
  padding: 1rem 1.5rem;
  text-align: center;
  text-transform: none;
  transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  box-shadow: -6px 8px 10px rgba(81, 41, 10, 0.1),
    0px 2px 2px rgba(81, 41, 10, 0.2);

  &:active {
    background-color: #f3f4f6;
    box-shadow: -1px 2px 5px rgba(81, 41, 10, 0.15),
      0px 1px 1px rgba(81, 41, 10, 0.15);
    transform: translateY(0.125rem);
  }

  &:focus {
    box-shadow: rgba(72, 35, 7, 0.46) 0 0 0 4px,
      -6px 8px 10px rgba(81, 41, 10, 0.1), 0px 2px 2px rgba(81, 41, 10, 0.2);
  }
`;

const DownloadButton = styled(DefaultButton).attrs(() => ({ tabIndex: 0 }))`
  background-color: var(--color-primary-light-7);
  border: 2px solid #422800;
  border-radius: 30px;
  box-shadow: #422800 4px 4px 0 0;
  color: #422800;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  font-size: 18px;
  padding: 0 18px;
  line-height: 50px;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:hover {
    background-color: #fff;
  }

  &:active {
    box-shadow: #422800 2px 2px 0 0;
    transform: translate(2px, 2px);
  }
`;

const ButtonAccountEdit = styled(DefaultButton)`
  font-size: 1.6rem;
  font-weight: 500;
  letter-spacing: 0.2rem;
  border: none;

  padding: 0.8rem 1.6rem;

  cursor: pointer;
`;
export {
  DefaultButton,
  LoginButton,
  Button83,
  ContactButton,
  DownloadButton,
  ButtonAccountEdit,
};
