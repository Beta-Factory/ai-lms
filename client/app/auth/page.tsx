"use client";

import { LoginScreen } from "@/components/LoginScreen";
import { SignUpForm } from "@/components/SignUpScreen";
import { useState } from "react";

const Login = () => {
  const [auth, setAuth] = useState(false);

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        {auth ? <LoginScreen /> : <SignUpForm />}
        {/* should be separate route (need to be made ) */}
      </div>
    </>
  );
};

export default Login;
