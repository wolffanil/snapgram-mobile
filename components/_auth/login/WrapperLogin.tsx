import { useState } from "react";
import Login from "./loginForm/Login";
import ForgotLogin from "./resetForm/ForgotLogin";

const WrapperLogin = () => {
  const [isChangeForm, setIsChangeForm] = useState(false);

  if (isChangeForm)
    return (
      <ForgotLogin
        setIsChangeForm={setIsChangeForm}
        isChangeForm={isChangeForm}
      />
    );

  if (!isChangeForm)
    return (
      <Login setIsChangeForm={setIsChangeForm} isChangeForm={isChangeForm} />
    );
};

export default WrapperLogin;
