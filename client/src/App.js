import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  About,
  Landing,
  Register,
  Login,
  Error,
  VerifyEmail,
  Dashboard,
  ProtectedRoute,
  FirstLogin,
  ProtectedRouteDash,
  Setting,
  Account,
  UploadCMD,
  Deposit,
  Security,
  SettingPassword,
  ProtectedRoutePermission,
  Bank,
  BankHome,
  Transfer,
  Recharge,
  WithDraw,
  BuyCard,
  ForgotPassword,
} from './pages';
import { ShareLayout, ShareLayoutDash, ShareLayoutSetting } from './components';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShareLayout></ShareLayout>}>
          <Route index element={<Landing></Landing>}></Route>
          <Route path="/about" element={<About></About>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route
            path="/register/verify-email"
            element={<VerifyEmail></VerifyEmail>}
          ></Route>
          <Route path="/login" element={<Login></Login>}></Route>

          <Route path="*" element={<Error></Error>}></Route>
        </Route>

        <Route path="/first-login" element={<FirstLogin></FirstLogin>}></Route>
        <Route
          path="/forgot-password"
          element={<ForgotPassword></ForgotPassword>}
        ></Route>

        <Route path="/dashboard" element={<ShareLayoutDash></ShareLayoutDash>}>
          <>
            <Route
              index
              element={
                <ProtectedRoute>
                  <ProtectedRouteDash>
                    <Dashboard></Dashboard>
                  </ProtectedRouteDash>
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="setting"
              element={
                <ProtectedRoute>
                  <ProtectedRouteDash>
                    <ShareLayoutSetting></ShareLayoutSetting>
                  </ProtectedRouteDash>
                </ProtectedRoute>
              }
            >
              <Route path="all" element={<Setting></Setting>}></Route>
              <Route path="account" element={<Account></Account>}></Route>
              <Route
                path="password"
                element={<SettingPassword></SettingPassword>}
              ></Route>
              <Route path="upload" element={<UploadCMD></UploadCMD>}></Route>
              <Route path="security" element={<Security></Security>}></Route>
              <Route
                path="deposit"
                element={
                  <ProtectedRoutePermission>
                    <Deposit></Deposit>
                  </ProtectedRoutePermission>
                }
              ></Route>
            </Route>
            <Route path="deposit" element={<Bank></Bank>}>
              <Route index element={<BankHome></BankHome>}></Route>
              <Route path="transfer" element={<Transfer></Transfer>}></Route>
              <Route path="recharge" element={<Recharge></Recharge>}></Route>
              <Route path="withdraw" element={<WithDraw></WithDraw>}></Route>
              <Route path="buy" element={<BuyCard></BuyCard>}></Route>
            </Route>
          </>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
