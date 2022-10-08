import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Slide from '@mui/material/Slide';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

import { useGlobalContext } from '../context/appContext';

const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    // padding: 2,
    width: '40rem',
  },
  '& .MuiDialogActions-root': {
    // padding: theme.spacing(1),
  },
}));

const CustomDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, fontSize: 20 }} {...other}>
      {children}
      {/* {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null} */}
    </DialogTitle>
  );
};

CustomDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'green',
  },
  '& label': {
    // color: 'green',
    // paddingLeft: 4,
    // marginLeft: 2,
    padding: 2,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'red',
      // padding: 2,
    },
    '&:hover fieldset': {
      borderColor: 'yellow',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'green',
    },
  },
});

const initPwd = {
  pwd: '',
  isShow: false,
  isConfirm: false,
};

const DialogMUIPwd = ({ open, handleClose, namePage, lengthPage }) => {
  const [pwdInput, setPwdInput] = useState(initPwd);

  const {
    user,
    isConfirmPwdBuy,
    confirmPwdBuy,
    actionBankPage,
    bankPage,
    showToast,
  } = useGlobalContext();

  // const handleCheckPlus = () => {
  //   if (getAmount === 5) {
  //     showToast('💣 Amount must not more than 5', 2000, 'error');
  //   }
  // };
  // const handleCheckMinus = () => {
  //   if (getAmount === 1) {
  //     showToast('💣 Amount must not less than 1', 2000, 'error');
  //   }
  // };

  const handleClickShowPassword = () => {
    setPwdInput({
      ...pwdInput,
      isShow: !pwdInput.isShow,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangePwd = (e) => {
    setPwdInput({ ...pwdInput, pwd: e.target.value });
  };

  const handleCheckPwd = (pwd, confirmPwd) => {
    if (pwd === confirmPwd) {
      confirmPwdBuy(true);
      actionBankPage({
        numPage: bankPage.numPage,
        name: namePage,
        length: lengthPage,
        actionType: 'plus',
        isOK: true,
      });

      showToast('🎉 Password correct', 2000, 'success');
    } else {
      showToast('💣 Password is not correct', 2000, 'error');
    }
  };

  const handleClickOK = (e) => {
    handleCheckPwd('123456', pwdInput.pwd);
    handleClose();
  };

  return (
    <CustomDialog
      open={open}
      onClose={handleClose}
      fullWidth={false}
      sx={{ display: 'grid' }}
    >
      <CustomDialogTitle sx={{ color: 'green', fontSize: 20 }}>
        Confirm
      </CustomDialogTitle>
      <DialogContent sx={{ display: 'grid' }}>
        <DialogContentText sx={{ fontSize: 12, paddingLeft: 1 }}>
          Make sure you want to buy this card, please enter your password here.
          We will send updates occasionally.
        </DialogContentText>

        <FormControl
          sx={{ m: 1, width: '95%', display: 'grid', justifySelf: 'center' }}
          variant="standard"
        >
          <InputLabel
            htmlFor="standard-adornment-password"
            sx={{ fontSize: 12 }}
            color="success"
          >
            Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={pwdInput.isShow ? 'text' : 'password'}
            value={pwdInput.pwd}
            onChange={handleChangePwd}
            color="success"
            // fullWidth={true}
            sx={{ fontSize: 13 }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                >
                  {pwdInput.isShow ? <MdVisibilityOff /> : <MdVisibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ fontSize: 11, color: '#54bab9' }}>
          Cancel
        </Button>
        <Button onClick={handleClickOK} sx={{ fontSize: 11, color: '#54bab9' }}>
          OK
        </Button>
      </DialogActions>
    </CustomDialog>
  );
};

export default DialogMUIPwd;
